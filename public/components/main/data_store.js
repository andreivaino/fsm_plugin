import { Comparators } from '@elastic/eui/lib/services/sort';
import { Random } from '@elastic/eui/lib/services/random';
import { times } from '@elastic/eui/lib/services/utils';

const random = new Random();

const createCountries = () => [
  { code: 'NL', name: 'Netherlands', flag: '????' },
  { code: 'CZ', name: 'Czech Republic', flag: '????' },
  { code: 'ZA', name: 'South Africa', flag: '????' },
  { code: 'US', name: 'United States', flag: '????' },
  { code: 'AU', name: 'Australia', flag: '????' },
  { code: 'IL', name: 'Israel', flag: '????' },
  { code: 'NO', name: 'Norway', flag: '????' },
  { code: 'IT', name: 'Italy', flag: '????' },
  { code: 'CA', name: 'Canada', flag: '????' },
  { code: 'CG', name: 'Congo', flag: '????' },
  { code: 'CL', name: 'Chile', flag: '????' },
  { code: 'FJ', name: 'Fiji', flag: '????' },
  { code: 'GB', name: 'United Kingdom', flag: '????' },
  { code: 'GR', name: 'Greece', flag: '????' },
  { code: 'HT', name: 'Haiti', flag: '????' },
  { code: 'LB', name: 'Lebanon', flag: '????' },
  { code: 'MM', name: 'Myanmar', flag: '????' },
  { code: 'MX', name: 'Mexico', flag: '????' },
  { code: 'NG', name: 'Nigeria', flag: '????' },
  { code: 'SG', name: 'Singapore', flag: '????' },
  { code: 'SO', name: 'Somalia', flag: '????' },
  { code: 'TN', name: 'Tunisia', flag: '????' },
  { code: 'VE', name: 'Venezuela', flag: '????' },
  { code: 'ZM', name: 'Zambia', flag: '????' },
];

const firstNames = [
  'Very long first name that will wrap or be truncated',
  'Another very long first name which will wrap or be truncated',
  'Clinton',
  'Igor',
  undefined,
  'Drew',
  null,
  'Rashid',
  undefined,
  'John',
];

const lastNames = [
  'Very long last name that will wrap or be truncated',
  'Another very long last name which will wrap or be truncated',
  'Gormley',
  'Motov',
  'Minarik',
  'Raines',
  'Král',
  'Khan',
  'Sissel',
  'Dorlus',
];

const github = [
  'martijnvg',
  'elissaw',
  'clintongormley',
  'imotov',
  'karmi',
  'drewr',
  'HonzaKral',
  'rashidkpc',
  'jordansissel',
  'silne30',
];



function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    xmlHttp.send(null);
	  //parses into JSON
    return JSON.parse(xmlHttp.responseText);
}
const getQueryData = (url) => {
  const data = httpGet(url).response;
  console.log(data); 
  const re_data = []
  
  data.forEach(function (item, index){
    re_data.push({
        id : item._id,
        index : index,
        src_ip : item._source.src_ip,
        src_port : item._source.src_port,
        timestamp : item._source['@timestamp'],
        dest_ip : item._source.dest_ip,
        dest_port : item._source.dest_port,
        message : item._source.message 
      })
  });
  console.log('results:' + re_data.length);

  return re_data;
  
}

const dob = new Date(1980, 1, 1);

const createUsers = countries => {
  return times(20, index => {
    return {
      id: index,
      firstName: index < 10 ? firstNames[index] : firstNames[index - 10],
      lastName: index < 10 ? lastNames[index] : lastNames[index - 10],
      github: index < 10 ? github[index] : github[index - 10],
      dateOfBirth: dob,
      nationality: random.oneToOne(
        countries.map(country => country.code),
        index
      ),
      online: index % 2 === 0,
    };
  });
};

export const createDataStore = () => {
  const countries = createCountries();
  const users = createUsers(countries);
  const data = getQueryData('../api/fsm_plugin/pfsenseblocked'); 
  //can type data in console to return values
  //good for testing purposes to see what values is stored in data
  window.data=data;

  return {
    countries,
    users,
    data,
    findUsers: (pageIndex, pageSize, sortField, sortDirection) => {
      let items;
      console.log('findUsers', pageIndex, pageSize, sortField, sortDirection)
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

    deleteUsers: (...ids) => {
      ids.forEach(id => {
        const index = users.findIndex(user => user.id === id);
        if (index >= 0) {
          users.splice(index, 1);
        }
      });
    },

    cloneUser: id => {
      const index = users.findIndex(user => user.id === id);
      if (index >= 0) {
        const user = users[index];
        users.splice(index, 0, { ...user, id: users.length });
      }
    },

    getCountry: code => countries.find(country => country.code === code),
  };
};