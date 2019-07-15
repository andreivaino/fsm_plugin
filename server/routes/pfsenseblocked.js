/*
// Blocked incoming packets from known bad sites
// Returns firewall blocked messages within the last day
// Uses the “_source” filter to limit what data is returned
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
		path: '/api/fsm_plugin/pfsenseblocked',
		method: 'GET',
		//this is async, so we use await to wait until a value is returned
		//you are defining nested functions
		handler : async function (req, h) {
			const query =  req.params.searchterm;
			var hits = 0;
			var body = null;
			await client.search({
				_source: ["@timestamp", "src_ip", "src_port", "proto", "dest_ip", "dest_port", "message"],
				index: 'pfsense-*',
				size: 1000,
				body: {
					  "query": {
						"bool": {
						  "must": [
							{
							  "match": {
								"action": "block"
							  }
							}
						  ],
						  "filter": [
							{
							  "range": {
								"@timestamp": {
								  "gte": "now-1d/d"
								}
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

