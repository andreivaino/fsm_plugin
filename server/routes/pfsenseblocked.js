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
		path: '/api/fsm_plugin/pfsenseblocked/{searchterm}',
		method: 'GET',
		//this is async, so we use await to wait until a value is returned
		//you are defining nested functions
		handler : async function (req, h) {
			const query =  req.params.searchterm;
			var hits = 0;
			var body = null;
			await client.search({
				index: 'pfsense-*',
				q: query,
			}).then(function (body) {
				hits = body.hits.hits;
				body = body;
				console.log(hits);
			}, function (error) {
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

