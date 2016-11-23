import React from 'react'
import ReactDOM from 'react-dom'
import './style'

import { initialize } from './Containers/App'


initialize({ apiUrl: "/api/v0" }).then(({ provider }) => {
  ReactDOM.render(
    provider,
    document.getElementById("app")
  );
});
