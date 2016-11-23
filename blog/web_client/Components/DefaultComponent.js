import React, { Component } from 'react'
import * as actions from '../Actions'
import { bindActionCreators } from 'redux'


export default class DefaultComponent extends Component {
  static propTypes = {
    data:  React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
    ]).isRequired,
    dispatch: React.PropTypes.func.isRequired
  }
  constructor(props) {
      super(props);
      this.url = "/";
      this.mounted = false;
  }

  actions = bindActionCreators(actions, this.props.dispatch)

  componentDidMount() {
    this.mounted = true;
    if (this.keyword)
      this.actions.fetchApi(this.url, this.keyword);
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.keyword)
      this.actions.clearState(this.keyword);
  }
}
