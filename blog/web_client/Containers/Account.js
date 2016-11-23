import React from 'react';
import { connect } from 'react-redux';
import { SignOutButton } from 'redux-auth/default-theme';
import { browserHistory } from 'react-router';

class Account extends React.Component {
  render() {
    return (
      <div>
        <p>This page should only visible to authenticated users.</p>
        <SignOutButton next={() => browserHistory.push('/')} />
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(Account);
