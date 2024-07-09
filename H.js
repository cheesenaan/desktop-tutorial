import logo from './logo.svg';
import './App.css';

import React, { Fragment, Component } from 'react';
import { VDSManager } from '@vds/utilities';
import { Title } from '@vds/typography';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <VDSManager />
          <Title>Viewport Manager</Title>
        </div>
      </Fragment>
    );
  }
}
