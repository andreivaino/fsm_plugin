/*
// Multi-index query to return messages from HoneyTrap and Snort together
// Should is used for "OR" and Must is used for "AND"
// ~ is the regexp complement operator so we say NOT (heartbeat)
// this was because must_not was not working
// Uses the “_source” filter to limit to the message field
*/

import elasticsearch from 'elasticsearch'

export default function (server) {

	//JSON object defined
	const client = new elasticsearch.Client({
		  host: 'localhost:9200',
		  log: 'trace'
		});

	//this is a JSON object being sent to server.route
	server.route({
		// brackets { } mean it will be automatically parsed as a variable
		// this is the relative web address which will be contacted to run this query
		path: '/api/fsm_plugin/honeysnort',
		method: 'GET',
		//this is async, so we use await to wait until a value is returned
		//you are defining nested functions
		handler : async function (req, h) {
			const query =  req.params.searchterm;
			var hits = 0;
			var body = null;
			await client.search({
				index: ["honeytrap", "pfsense-*"],
				size: 1000,
				body: {
				  "query": {
					"bool": {
					  "should": [
						{
						  "bool": {
							"must": [
							  {
								"regexp": {
								  "prog": "snort.*"
								}
							  },
							  {
								"wildcard": {
								  "_index": "pfsense-*"
								}
							  }
							],
							"filter": [
							  {
								"range": {
								  "@timestamp": {
									"gte": "now-10m"
								  }
								}
							  }
							]
						  }
						},
						{
						  "bool": {
							"must": [
							  {
								"regexp": {
								  "category": "~(heartbeat)"
								}
							  },
							  {
								"term": {
								  "_index": "honeytrap"
								}
							  }
							],
							"filter": [
							  {
								"range": {
								  "date": {
									"gte": "now-10m"
								  }
								}
							  }
							]
						  }
						}
					  ]
					}
				  }
				}
			}).then(function (body) {
				hits = body.hits.hits;
				body = body;
				//console.log(hits);
			}, function (error) {
				//send an error message to the console log so we know something went wrong
				console.trace(error.message);
			});

			//returns a JSON object, defined as dictionary
			return {
				response: hits,
				body : body
			};
		}

	});

}

