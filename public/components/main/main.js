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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

function Query2() {
  return {
    render : () => {
	  console.log('Query2')
      return (
        <div>
              <EuiTitle size="l">
                <h1>Firewall Login Attempts in the last 5 minutes</h1>
              </EuiTitle>
    	      <Table2 />
        </div>
      );
    },
  }
}

function Query3 (){
  return {
    render : () => {
      console.log('Query3')
      return (
        <div>
            <EuiTitle size="l">
              <h1>HoneyTrap Non-Heartbeat Events in the last 90 days</h1>
            </EuiTitle>
          <Table3 />
        </div>
      );
    }
  }
}

function Query4 (){
  return {
    render : () => {
      console.log('Query4')
      return (
        <div>
            <EuiTitle size="l">
              <h1>Snort Messages for the last day</h1>
            </EuiTitle>
          <Table4 />
        </div>
      );
    }
  }
}

function Query5 (){
  return {
    render : () => {
      console.log('Query5')
      return (
        <div>
            <EuiTitle size="l">
              <h1>Windows Defender Malware Detected</h1>
            </EuiTitle>
          <Table5 />
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

  onSearchTextChange(event) {
	  this.state.searchTerm = event.target.value;
  }

  searchData(){
	const { httpClient } = this.props;
    	httpClient.get('../api/fsm_plugin/pfsenseblocked/'+this.state.searchTerm).then((response) => {
      		this.setState({ resp: response.data });
		//window.alert(this.state.resp); //return in browser pop-up Window
		//console.log(this.state.resp); //return in console
  	});
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/fsm_plugin/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
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
                  	   <Link to="/query2">Firewall Login Attempts in the last twenty minutes</Link>
                    </li>
                    <li>
                  	   <Link to="/query3">HoneyTrap Non-Heartbeat Events in the last three days</Link>
                    </li>
					<li>
					   <Link to="/query4">Snort Messages for the last day</Link>
					</li>
					<li>
					   <Link to="/query5">Windows Defender Malware detected in the last five days</Link>
					</li>
                  </ul>

                  <hr />

                  <Route path="/query1" component={Query1} />
                  <Route path="/query2" component={Query2} />
                  <Route path="/query3" component={Query3} />
				  <Route path="/query4" component={Query4} />
				  <Route path="/query5" component={Query5} />
                </div>
              </Router>
		
		
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
  

}


/*
              <EuiText>
                <h3>
                  <FormattedMessage
                    id="fsmPlugin.congratulationsText"
                    defaultMessage=""
                  />
                </h3>
                <p>
                  <FormattedMessage
                    id="fsmPlugin.serverTimeText"
                    defaultMessage="The server time (via API call) is {time}"
                    values={{ time: this.state.time || 'NO API CALL YET' }}
                  />
                </p>
              </EuiText>
	      <EuiForm>
		<EuiFormRow
			label="Search Field"
			helpText="Please enter search value"
		>
		<EuiFieldText name="search_term" onChange={(event) => this.onSearchTextChange(event)}/>
		</EuiFormRow>
		<EuiButton  fill onClick={() => this.searchData()}>
		Search
		</EuiButton>
		</EuiForm>
*/
