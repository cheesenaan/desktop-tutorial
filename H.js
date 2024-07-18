import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation, NavTab } from '@vds/layouts';
import ResumeBuild from './components/ResumeBuild';
import DisplayResume from './components/DisplayResume';
import Form from './components/Form';
import { container } from './styles/Components.css';

const App = () => {
  const [data, setData] = useState(null);

  const handleDataSubmit = (submittedData) => {
    setData(submittedData);
  };

  return (
    <Fragment>
      <div className='container'>
        <Router>
          <Navigation surface="light">
            <NavTab>
              <Link to="/resume-build">Resume Build</Link>
            </NavTab>
            <NavTab>
              <Link to="/display-resume">Display Resume</Link>
            </NavTab>
            <NavTab>
              <Link to="/form">Form</Link>
            </NavTab>
          </Navigation>
          <div id="app-container" style={container}>
            <Routes>
              <Route path="/resume-build" element={<ResumeBuild onDataSubmit={handleDataSubmit} />} />
              <Route path="/display-resume" element={<DisplayResume data={data} />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Fragment>
  );
};

export default App;
