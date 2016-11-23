import React from 'react';
import { connect } from 'react-redux';
import { EmailSignInForm } from 'redux-auth/default-theme';
import { browserHistory } from 'react-router';

class SignIn extends React.Component {
  render() {
    return (
      <div>
        <p>Unauthenticated users can't access the account page.</p>
        <EmailSignInForm next={() => browserHistory.push('/account')} />
      </div>
    );
  }
}
export default connect(({ routes }) => ({ routes }))(SignIn);
