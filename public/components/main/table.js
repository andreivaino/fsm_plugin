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
      sortField: 'index',
      sortDirection: 'asc',
    };

  }

  onTableChange = ({ page = {}, sort = {} }) => {

    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;
    console.log('onTableChange', page, sort, pageIndex, pageSize, sortField, sortDirection)
    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
  };

  componentWillUnmount(){
    console.log('table unmounted')
  }

  componentDidCatch(error, info){
    console.log('didCatch', error, info);
  }
  static getDerivedStateFromError(error){
    console.log('getDerivedStateFromError', error)
    return {hasError : 'true'};
  }
  render() {
	  //object destructoring - defines four variables and gets their values from this.state
    const { pageIndex, pageSize, sortField, sortDirection } = this.state;
    console.log('render', this.state)
    const { pageOfItems, totalItemCount } = store.findUsers(
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    );

    const columns = [
      {
        field: 'index',
        name: 'Index',
        sortable: true,
        truncateText: true,
        mobileoptions: {
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
      },
      {
        field: 'timestamp',
        name: 'Timestamp',
        sortable: true,
        truncateText: true,
        mobileoptions: {
          render: item => (
            <span>
              {item.timestamp}
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
        truncateText: true,
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