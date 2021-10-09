import React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from "./App";
import PropTypes from 'prop-types'

export default class WebComponent extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App user={this.getAttribute('user')} />, this);
  }
}

WebComponent.propTypes = {
  user: PropTypes.string 
}

if (!customElements.get('wc-profile')) {
  customElements.define('wc-profile', WebComponent);
}
