import { Comparators } from '@elastic/eui/lib/services/sort';
import { Random } from '@elastic/eui/lib/services/random';
import { times } from '@elastic/eui/lib/services/utils';

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
  //const data = httpGet(url).response; 

  return times(20, index => {
    return {
      id: index,
      timestamp : 'timestamp',
      src_ip :   'source.src_ip',
      src_port : 'source.src_port',
      proto:     'source.proto',
      dest_ip :  'source.dest_ip',
      dest_port : 'source.dest_port',
      message :  'source.message' 
    };
  });
}

export const createDataStore = () => {

  const data = getQueryData('../api/fsm_plugin/pfsenseblocked'); 
  //can type data in console to return values
  //good for testing purposes to see what values is stored in data
  //window.data=data;

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