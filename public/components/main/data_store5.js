/*
//  The original version of this file was taken from: https://raw.githubusercontent.com/elastic/eui/75fee43023fbe7ed32cf437cd711322d4228a7e0/src-docs/src/views/tables/data_store.js
  
  Copyright 2019 Elasticsearch BV

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
//
//  This file has been modified for our specific purposes.
//
*/

import { Comparators } from '@elastic/eui/lib/services/sort';
//import { Random } from '@elastic/eui/lib/services/random';
//import { times } from '@elastic/eui/lib/services/utils';

//Gets a URL using HTTP
const httpGet = (theUrl) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    xmlHttp.send(null);
	  //parses into JSON
    return JSON.parse(xmlHttp.responseText);
}

//Parse the data into an array
const getQueryData = (url) => {
  const data = httpGet(url).response; 
  const re_data = []
  
  data.forEach(function (item, index){
    re_data.push({
		id : index,
		date : item._source['@timestamp'],
        agent_ip : item._source.agent.ip,
        agent_name : item._source.agent.name,
		threat_name: item._source.data.win.eventdata['threat Name'],
        message: item._source.data.win.system.message,
        path : item._source.data.win.eventdata.path,
        category : item._source.data.win.eventdata['category Name'] 
      })
  });
  console.log('results:' + re_data.length);
  return re_data;
  
}

export const createDataStore5 = () => {

  const data = getQueryData('../api/fsm_plugin/windowsdefendermalware'); 
  //can type data in console to return values
  //good for testing purposes to see what values is stored in data
  window.data=data;

  return {
	data,
	
    findUsers: (pageIndex, pageSize, sortField, sortDirection) => {
      let items;

      if (sortField) {
        items = data
          .slice(0)
          .sort(
            Comparators.property(sortField, Comparators.default(sortDirection))
          );
      } else {
        items = data;
      }

      let pageOfItems;

      if (!pageIndex && !pageSize) {
        pageOfItems = items;
      } else {
        const startIndex = pageIndex * pageSize;
        pageOfItems = items.slice(
          startIndex,
          Math.min(startIndex + pageSize, items.length)
        );
      }

      return {
        pageOfItems,
        totalItemCount: items.length,
      };
    },
	
  };
};
