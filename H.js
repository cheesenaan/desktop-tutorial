return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <ButtonGroup
            childwidth="100%"
            viewport="desktop"
            rowQuantity={{ desktop: 2 }}
            data={[
              {
                children: 'Get resume data (test)',
                size: 'large',
                use: 'primary',
                width: 'auto',
                onClick: this.getResumeData,
              },
              {
                children: 'Cancel',
                size: 'large',
                use: 'textLink',
                width: 'auto',
              },
            ]}
            alignment="center"
          />
        </div>

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

export default DisplayResume;
