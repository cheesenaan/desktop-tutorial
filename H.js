class DisplayResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      resumeData: null,
      error: null,
      isLoading:false,
    };
  }

  componentDidMount() {
    this.getResumeData();
  }

  getResumeData = async () => {
    this.setState({ isLoading: true }, () => {
      console.log('isLoading State for getResumeData updated to true successfully:', this.state.isLoading); 
    });

    try {
      const pathname = window.location.pathname;
      const user_id_get = pathname.substring(1);
      console.log("user_id_get is ", user_id_get);

      // Make the GET request using axios
      const response = await axios.get('api/v1/resume', {
        params: { user_id: user_id_get },
      });

      // Axios automatically parses JSON responses, so you can access data directly
      this.setState({ resumeData: response.data, error: null });
    } catch (error) {
      // Handle error
      console.error('Failed to fetch resume data:', error);
      this.setState({ error: 'Failed to fetch resume data. Please try again later.' });
    } finally {
      this.setState({ isLoading: false }, () => {
        console.log('isLoading State for getResumeData updated to false successfully:', this.state.isLoading); 
      });
    }
  };

  render() {
    const { resumeData, error } = this.state;

    return (
      <div>

        <Loader 
        active={this.state.isLoading}
        fullscreen={true}
        surface="light" 
        />

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {resumeData && (
          <> 
          </>
        )}

      </div>
    );
  }
}

export default withRouter(DisplayResume);

