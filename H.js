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
      
      // const response = await fetch(`api/v1/resume?user_id=${this.props.userId}`, {
        const response = await fetch(`api/v1/resume?user_id=${user_id_get}`, {
        mode: 'no-cors', // Adjust as per your CORS setup
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      this.setState({ resumeData: data, error: null });
    } catch (error) {
      alert(error)
      console.error('Failed to fetch resume data:', error);
      this.setState({ error: 'Failed to fetch resume data. Please try again later.' });
    }

    this.setState({ isLoading: false }, () => {
      console.log('isLoading State for getResumeData updated to false successfully:', this.state.isLoading); 
    });

  };

  render() {
    const { resumeData, error } = this.state;

    return (
      <div>
