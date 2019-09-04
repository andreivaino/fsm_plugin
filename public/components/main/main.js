/*
// Displays the main page of the plugin
// Each item is a React Component which can be accessed through the React Router.
// User clicks on each search heading to have it displayed in the browser Window.
//
*/

import React, {Component} from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiLink,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { Table } from  './table.js';
import { Table2 } from './table2.js';
import { Table3 } from './table3.js';
import { Table4 } from './table4.js';
import { Table5 } from './table5.js';
import { Table6 } from './table6.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Displays the Query1
function Query1() {
  return {
    render : () => {
	  console.log('Query1')
      return (
        <div>
              <EuiTitle size="l">
                <h1>Blocked incoming packets from known bad sites</h1>
              </EuiTitle>
    	      <Table />
        </div>
      );
    }
  }
}

// Displays the Query2
function Query2() {
  return {
    render : () => {
	  console.log('Query2')
      return (
        <div>
              <EuiTitle size="l">
                <h1>Firewall Login Attempts</h1>
              </EuiTitle>
    	      <Table2 />
        </div>
      );
    },
  }
}

// Displays the Query3
function Query3 (){
  return {
    render : () => {
      console.log('Query3')
      return (
        <div>
            <EuiTitle size="l">
              <h1>HoneyTrap Non-Heartbeat Events</h1>
            </EuiTitle>
          <Table3 />
        </div>
      );
    }
  }
}

// Displays the Query4
function Query4 (){
  return {
    render : () => {
      console.log('Query4')
      return (
        <div>
            <EuiTitle size="l">
              <h1>Snort Messages</h1>
            </EuiTitle>
          <Table4 />
        </div>
      );
    }
  }
}

// Displays the Query5
function Query5 (){
  return {
    render : () => {
      console.log('Query5')
      return (
        <div>
            <EuiTitle size="l">
              <h1>Windows Defender Detected Malware</h1>
            </EuiTitle>
          <Table5 />
        </div>
      );
    }
  }
}

// Displays the Query6
function Query6 (){
  return {
    render : () => {
      console.log('Query6')
      return (
        <div>
            <EuiTitle size="l">
              <h1>Combined Snort Blocked and HoneyTrap Non-Heartbeat Events</h1>
            </EuiTitle>
          <Table6 />
        </div>
      );
    }
  }
}


export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
	
    const { title } = this.props;
    return (
     <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>
                <FormattedMessage
                  id="fsmPlugin.helloWorldText"
                  defaultMessage="{title} Query Dashboard"
                  values={{ title }}
                />
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h3>
                  <FormattedMessage
                    id="fsmPlugin.congratulationsTitle"
                    defaultMessage="Please select a query to display the corresponding table:"
                  />
                </h3>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
			
              <Router>
                <div>
                  <ul>
                    <li>
                  	   <Link to="/query1">Blocked incoming packets from known bad sites in the last day</Link>
                    </li>
                    <li>
                  	   <Link to="/query2">Firewall Login Attempts in the last thirty minutes</Link>
                    </li>
                    <li>
                  	   <Link to="/query3">HoneyTrap Non-Heartbeat Events in the last three days</Link>
                    </li>
                    <li>
                           <Link to="/query4">Snort Messages for the last day</Link>
                    </li>
                    <li>
                           <Link to="/query5">Windows Defender Detected Malware in the last five days</Link>
                    </li>
                    <li>
                           <Link to="/query6">HoneyTrap Non-HeartBeat Events and Snort Messages</Link>
                    </li>

                  </ul>

                  <hr />

                  <Route path="/query1" component={Query1} />
                  <Route path="/query2" component={Query2} />
                  <Route path="/query3" component={Query3} />
                  <Route path="/query4" component={Query4} />
                  <Route path="/query5" component={Query5} />
                  <Route path="/query6" component={Query6} />
                </div>
              </Router>
		
		
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}

