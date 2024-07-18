if (response.ok) {
  const data = await response.json();
  console.log('Response data:', data); // Log the response data to check its structure
  const { success, message, userId } = data;
  if (success) {
    console.log('Success message:', message);
    console.log('Received userId:', userId);
    alert(`${message} User ID: ${userId}`);
    this.setState({ userId: userId }, () => {
      console.log('State updated successfully:', this.state.userId); // Log the updated state
    });
  } else {
    console.log('User Data save failed:', message);
    alert('User Data save failed!');
  }
} else {
  console.log('Network response not OK');
  alert('Network error, please try again later.');
}
