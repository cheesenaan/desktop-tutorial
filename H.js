const App = () => {
  const [data, setData] = useState(null);

  const handleDataSubmit = (submittedData) => {
    setData(submittedData);
  };

  return (
    <Fragment>
      <div className='container'>
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
      </div>
    </Fragment>
  );
};

export default App;

ERROR in ./src/App.js 27:0-51
Module not found: Error: Can't resolve './components/ResumeBuild' in '/j6yv-workspace/sulefa8/resume-ui/sulemaan-resume-app/src'
ERROR
[eslint] 
src/App.js
  Line 39:10:  'Navigation' is not defined  react/jsx-no-undef
  Line 40:12:  'NavTab' is not defined      react/jsx-no-undef
  Line 41:14:  'Link' is not defined        react/jsx-no-undef
  Line 43:12:  'NavTab' is not defined      react/jsx-no-undef
  Line 44:14:  'Link' is not defined        react/jsx-no-undef
  Line 46:12:  'NavTab' is not defined      react/jsx-no-undef
  Line 47:14:  'Link' is not defined        react/jsx-no-undef
  Line 50:40:  'container' is not defined   no-undef
  Line 51:12:  'Routes' is not defined      react/jsx-no-undef
  Line 52:14:  'Route' is not defined       react/jsx-no-undef
  Line 53:14:  'Route' is not defined       react/jsx-no-undef
  Line 54:14:  'Route' is not defined       react/jsx-no-undef

Search for the keywords to learn more about each error.
