import $ from 'jquery';

$(document.body).on('keypress', function (event) {
  if (event.which === 58) {
    alert('boo!');
  }
  else if (event.which === 65){
  	console.log('trying query')
  	$.get('127.0.0.1:9200/pfsense-*/_search', 
  	{
		"_source": ["@timestamp", "src_ip", "src_port", "proto", "dest_ip", "dest_port", "message"],
		"query": {
			"bool": {
	 			"must": [
	 				{"match": {"action" : "block"}}
	 			],
	 		"filter" : [
	    		{"range": 
		    		{
		        		"@timestamp": {
		             		"gte" : "now-1d/d",
		              		"lt" :  "now/d"
		            	}
	        		}
	    		}
			]
			}
		}
	},
	function (data){
		console.log(data);
		alert('data was returned, check log')
	},
	'json'
	);
  }
});


