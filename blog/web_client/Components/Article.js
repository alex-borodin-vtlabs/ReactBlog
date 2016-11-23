import React, { Component } from 'react'
import { Link } from 'react-router'
import format_date from '../utils/format_date'
import { connect } from 'react-redux'
import DefaultComponent from './DefaultComponent'


class Article extends DefaultComponent {
  constructor(props) {
    super(props)
    this.url = `articles/${this.props.params['article_id']}`
    this.keyword = "article"
  }

  render(){
    const { title, created_at, text } = this.props.data;
    return(
        <div>
          <h1 className="display-6" key={"article-h1"}>{ title }</h1>
          <p key={"article-date"}>{ format_date(created_at) }</p>
          <article key={"article-article"} className="mb-3" dangerouslySetInnerHTML={ {__html: text} } />
          <Link to="/" key={"article-all"}>Все статьи</Link>
        </div>
    );
  }

}

export default connect(state => ({
  data: state.default.article
}))(Article)
