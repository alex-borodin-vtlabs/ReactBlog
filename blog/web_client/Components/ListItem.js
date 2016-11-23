import React from 'react'
import { Link } from 'react-router'
import format_date from '../utils/format_date'


export default ({ article }) => (
    <div>
        <h1 className="display-6">
            <Link to={`articles/${article.id}`}>{ article.title }</Link>
        </h1>
        <p className="time">{ format_date(article['created_at']) }</p>
        <article dangerouslySetInnerHTML={{__html: article['announce']}} />
    </div>
)
