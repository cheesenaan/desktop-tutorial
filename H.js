const DisplayResume = (props) => {
  // Define state variables using useState
  const [userId, setUserId] = useState(props.userId);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to replicate componentDidMount
  useEffect(() => {
    const getResumeData = async () => {
      setIsLoading(true);
      console.log('isLoading State for getResumeData updated to true');

      try {
        const pathname = window.location.pathname;
        const user_id_get = pathname.substring(1);
        console.log("user_id_get is ", user_id_get);

        // Make the GET request using axios
        const response = await axios.get('api/v1/resume', {
          params: { user_id: user_id_get },
        });

        // Axios automatically parses JSON responses, so you can access data directly
        setResumeData(response.data);
        setError(null);
      } catch (error) {
        // Handle error
        console.error('Failed to fetch resume data:', error);
        setError('Failed to fetch resume data. Please try again later.');
      } finally {
        setIsLoading(false);
        console.log('isLoading State for getResumeData updated to false');
      }
    };

    // Call the async function
    getResumeData();
  }, []); // Empty dependency array means this effect runs once when the component mounts
