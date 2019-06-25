import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
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
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';

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
		window.alert(this.state.resp); //return in browser pop-up Window
		console.log(this.state.resp); //return in console
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
