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
import { Table } from './table.js';
import { Table2 } from './table2.js';
import { Table3 } from './table3.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Query1() {
  return (
    <div>
          <EuiTitle size="l">
            <h1>Blocked incoming packets from known bad sites</h1>
          </EuiTitle>
	      <Table />
    </div>
  );
}

function Query2() {
  return (
    <div>
          <EuiTitle size="l">
            <h1>Firewall Login Attempts in the last 5 minutes</h1>
          </EuiTitle>
	      <Table2 />
    </div>
  );
}

function Query3() {
  return (
    <div>
          <EuiTitle size="l">
            <h1>HoneyTrap Non-Heartbeat Events in the last 90 days</h1>
          </EuiTitle>
	      <Table3 />
    </div>
  );
}

function Home() {
  return (
  <EuiPage>
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Page title</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Content title</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>Content body</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
  );
}



function Topics() {
  return (
    <div>
      <h2>Topics</h2>
    </div>
  );
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
                  defaultMessage="{title} Hello World!"
                  values={{ title }}
                />
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>
                  <FormattedMessage
                    id="fsmPlugin.congratulationsTitle"
                    defaultMessage="Congratulations"
                  />
                </h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
			
		   <Router>
			  <div>
				<ul>
				  <li>
					<Link to="/">Home</Link>
				  </li>
				  <li>
					<Link to="/query1">Blocked incoming packets from known bad sites</Link>
				  </li>
				  <li>
					<Link to="/query2">Firewall Login Attempts in the last 5 minutes</Link>
				  </li>
				  <li>
					<Link to="/query3">HoneyTrap Non-Heartbeat Events in the last 90 days</Link>
				  </li>
				</ul>

				<hr />

				<Route exact path="/" component={Home} />
				<Route path="/query1" component={Query1} />
				<Route path="/query2" component={Query2} />
				<Route path="/query3" component={Query3} />
			  </div>
			</Router>
			  
              <EuiText>
                <h3>
                  <FormattedMessage
                    id="fsmPlugin.congratulationsText"
                    defaultMessage="You have successfully created your first Kibana Plugin!"
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
		
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
  

}
