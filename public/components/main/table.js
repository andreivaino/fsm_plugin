//Example table test!
// Source code taken from "Adding sorting to a Basic Table"
import React, {Component} from 'react';
import { formatDate } from '@elastic/eui/lib/services/format';
import { createDataStore } from './data_store.js';
import {
  EuiBasicTable,
  EuiHealth,
  EuiIcon,
  EuiLink,
  EuiToolTip,
} from '@elastic/eui';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '????'
}
*/
const store = createDataStore();

export class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: 0,
      pageSize: 5,
      sortField: 'id',
      sortDirection: 'asc',
    };

    //this.onTableChange = this.onTableChange.bind(this);

  }

/*
  onTableChange = ({ page = {}, sort = {} }) => {

    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    console.log('onTableChange',  page, sort, pageIndex, pageSize, sortField, sortDirection)
    
    this.setState(
      {
        pageIndex,
        pageSize,
        sortField,
        sortDirection,
      }
    );
  }
*/

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

    const { pageOfItems, totalItemCount } = store.findUsers(
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    );

    const columns = [
	  {
        field: 'id',
        name: 'id',
		//dataType: 'date',
        sortable: true,
        truncateText: true,
		//render: date => formatDate(date, 'shortDateTime')
      },
	  {
        field: 'proto',
        name: 'Protocol',
        truncateText: false,
        hideForMobile: false,
        mobileOptions: {
          show: false,
        },
      }, 
	  {
        field: 'src_ip',
        name: 'Source IP',
        truncateText: false,
		sortable: true,
        hideForMobile: false,
        mobileOptions: {
          show: false,
        },
      }, 
	  {
        field: 'src_port',
        name: 'Source Port',
        truncateText: false,
        hideForMobile: false,
        mobileOptions: {
          show: false,
        },
      }, 
	  {
        field: 'dest_ip',
        name: 'Destination IP',
        truncateText: false,
		sortable: true,
        hideForMobile: false,
        mobileOptions: {
          show: false,
        },
      }, 
	  {
        field: 'dest_port',
        name: 'Destination Port',
        truncateText: false,
        hideForMobile: false,
        mobileOptions: {
          show: false,
        },
      }, 
      {
        field: 'message',
        name: 'Message',
        sortable: true,
        truncateText: false,
        mobileoptions: {
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
    ];
	
    const pagination = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItemCount: totalItemCount,
      pageSizeOptions: [3, 5, 8],
    };

    const sorting = {
      sort: {
        field: sortField,
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