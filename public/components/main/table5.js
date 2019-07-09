/*
// Source code taken from "Adding sorting to a Basic Table"
// Code heavily modified for use in project
*/

import React, {Component} from 'react';
import { formatDate } from '@elastic/eui/lib/services/format';
import { createDataStore5 } from './data_store5.js';
import {
  EuiBasicTable,
  EuiHealth,
  EuiIcon,
  EuiLink,
  EuiToolTip,
} from '@elastic/eui';

const store = createDataStore5();

export class Table5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: 0,
      pageSize: 10,
      sortField: 'date',
      sortDirection: 'desc',
    };
  }

  onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
  };

  render() {
	  //object destructoring - defines four variables and gets their values from this.state
    const { pageIndex, pageSize, sortField, sortDirection } = this.state;
    //console.log('Table3 - Render')
    const { pageOfItems, totalItemCount } = store.findUsers(
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    );

/*	id : index,
		date : item._source['@timestamp'],
        agent_ip : item._source['agent.ip'],
        agent_name : item._source['agent.name'],
		threat_name: item._source['data.win.eventdata.threat Name'],
        message: item._source['data.win.system.message'],
        path : item._source['data.win.eventdata.path'],
        category : item._source['data.win.eventdata.category Name'] */

    const columns = [
      /*
      {
        field: 'id',
        name: 'Index',
        sortable: true,
        truncateText: true,
        mobileOptions: {
          render: item => (
            <span>
              {item.index}
            </span>
          ),
          header: false,
          truncateText: false,  
          enlarge: true,
          fullWidth: true,
        },
      },*/
      {
        field: 'date',
        name: 'Date',
		dataType: 'date',
        render: date => formatDate(date, 'YYYY-MM-DD-HH:MM:SS'),
        sortable: true,
        truncateText: true,
      },
      {
        field: 'agent_ip', //variable name
        name: 'Agent IP',  //name of the column
        sortable: true,
        truncateText: true,
        mobileOptions: { //might be used for mobile data showing
          render: item => (
            <span>
              {item.agent_ip}
            </span>
          ),
          header: false,
          truncateText: false,  
          enlarge: true,
          fullWidth: true,
        },
      },
	  {
        field: 'agent_name', //variable name
        name: 'Agent Name',  //name of the column
        sortable: true,
        truncateText: true,
        mobileOptions: { //might be used for mobile data showing
          render: item => (
            <span>
              {item.agent_name}
            </span>
          ),
          header: false,
          truncateText: false,  
          enlarge: true,
          fullWidth: true,
        },
      },
	    {
        field: 'threat_name', //variable name
        name: 'Threat Name',  //name of the column
        sortable: true,
        truncateText: true,
        mobileOptions: { //might be used for mobile data showing
          render: item => (
            <span>
              {item.threat_name}
            </span>
          ),
          header: false,
          truncateText: false,  
          enlarge: true,
          fullWidth: true,
        },
      },
      {
        field: 'message',
        name: 'Message',
        sortable: true,
        truncateText: false,
        mobileOptions: {
          render: item => (
            <span>
              {item.message}
            </span>
          ),
          header: false,
          truncateText: false,  
          enlarge: true,
          fullWidth: true,
        },
      },
	  {
        field: 'path',
        name: 'Path',
        sortable: true,
        truncateText: false,
        mobileOptions: {
          render: item => (
            <span>
              {item.path}
            </span>
          ),
          header: false,
          truncateText: false,  
          enlarge: true,
          fullWidth: true,
        },
      },
      {
        field: 'category',
        name: 'Category',
        sortable: true,
        truncateText: false,
        mobileOptions: {
          render: item => (
            <span>
              {item.category}
            </span>
          ),
          header: false,
          truncateText: false,  
          enlarge: true,
          fullWidth: true,
        },
      },
    ];

    const pagination = {
      pageIndex: pageIndex,             //The current page (zero-based) index
      pageSize: pageSize,               //The maximum number of items that can be shown in a single page
      totalItemCount: totalItemCount,   //The total number of items the page is "sliced" of
      pageSizeOptions: [3, 5, 8],       //Configures the page size dropdown options
	  hidePerPageOptions: true,         //Hides the page size dropdown (This was done because it was not working!)
    };
	
    const sorting = {
      sort: {
        field: sortField,               //Indicates the property/field to sort on
        direction: sortDirection,
      },
    };

    return (
      <div>
        <EuiBasicTable
          items={pageOfItems}
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          onChange={this.onTableChange}
        />
      </div>
    );
  }
}