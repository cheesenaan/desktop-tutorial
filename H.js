import React, { Component } from 'react';

export default class App extends Component {
  render() {
    const handleBuildResumeClick = async () => {
      try {
        const response = await fetch('http://localhost:3000/resume?user_id=1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        alert('Resume built successfully!');
        console.log(data);
      } catch (error) {
        console.error('Error fetching resume:', error);
        alert('Error building resume');
      }
    };

    return (
      <div style={resumeSubmitButton}>
        <br /><br /><br /><br /><br />
        <ButtonGroup
          childWidth={'100%'}
          viewport={'desktop'}
          rowQuantity={{ desktop: 2 }}
          data={[
            {
              children: 'Build resume',
              size: 'large',
              use: 'primary',
              width: 'auto',
              onClick: handleBuildResumeClick
            },
            {
              children: 'Cancel',
              size: 'large',
              use: 'textLink',
              width: 'auto',
              onClick: () => alert('You clicked the Cancel button!')
            }
          ]}
          alignment={'center'}
        />
        <br /><br /><br /><br /><br />
      </div>
    );
  }
}
