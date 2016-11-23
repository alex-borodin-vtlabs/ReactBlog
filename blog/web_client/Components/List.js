import React, { Component } from 'react'
import ListItem from './ListItem'
import { connect } from 'react-redux'
import DefaultComponent from './DefaultComponent'

class List extends DefaultComponent {
  constructor(props) {
    super(props)
    this.url = "articles"
    this.keyword = "articles"
  }

  render() {
    return(
      <div>
          {this.props.data.map((article, index) => (
            <div className="mb-3" key={index}>
              <ListItem article={article} />
            </div>
            ))}
      </div>
    );
   }
}


export default connect(state => ({
  data: state.default.articles
}))(List)
