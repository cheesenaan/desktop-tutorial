
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {resumeData && (
          <div id='display_resume_1' style={{ display_resume_1_style }}>
            <div id='display_resume_1_text_area'>
              <TitleLockup
                id='hero-title'
                surface="dark"
                data={{
                  title: {
                    size: 'title2XLarge',
                    children: `${resumeData.user_data[0].first_name} ${resumeData.user_data[0].last_name}`,
                  },
                  subtitle: {
                    size: 'titleMedium',
                    children: `${resumeData.user_data[0].phone} ${resumeData.user_data[0].email} ${resumeData.user_data[0].location} ${resumeData.user_data[0].languages}`,
                  },
                }}
              />

              <TitleLockup
                id='hero-title'
                surface="dark"
                data={{
                  eyebrow: {
                    size: 'title2XLarge',
                    children: 'Please click continue to view your resume powered by the fastest 5G in the world',
                  },
                }}
              />

              <ButtonGroup
                id='hero-buttons'
                childWidth={'100%'}
                viewport={'desktop'}
                surface="dark"
                rowQuantity={{ desktop: 2 }}
                alignment={'left'}
                data={[
                  {
                    children: 'Continue',
                    size: 'medium',
                    use: 'secondary',
                    width: '150px',
                    onClick: () => alert('You clicked the Button example!'),
                  },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DisplayResume;
