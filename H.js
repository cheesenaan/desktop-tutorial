export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: null,
      error: null
    };
  }

  handleBuildResumeClick = async () => {
    try {
      const response = await fetch('/home', { mode: 'no-cors' });
      console.log('response is :', response);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Resume data:', data);
      this.setState({ resumeData: data, error: null });
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
      this.setState({ error: 'Failed to fetch resume data. Please try again later.' });
    }
  };

  render() {
    const { resumeData, error } = this.state;

    return (
      <div>
        <br /><br /><br /><br /><br />
        <ButtonGroup
          childwidth="100%"
          viewport="desktop"
          rowQuantity={{ desktop: 2 }}
          data={[
            {
              children: 'Build resume',
              size: 'large',
              use: 'primary',
              width: 'auto',
              onClick: this.handleBuildResumeClick
            },
            {
              children: 'Cancel',
              size: 'large',
              use: 'textLink',
              width: 'auto'
            }
          ]}
          alignment="center"
        />
        <br /><br /><br /><br /><br />

        {error && <div style={{ color: 'red' }}>{error}</div>}

        {resumeData && (
          <div>
            <h3>Resume Data:</h3>
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}
