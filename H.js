<div id='resume-build' style = {resumeBuild}>

            <br />  <br />  <br />  <br />  <br />
              <TitleLockup
                surface="light"
                textAlignment='center'
                data={{
                  
                  title: {
                    size: 'title2XLarge',
                    children: 'Resume Build.',
                  },
                }}
                />

              <br />  <br />  <br />  <br />  <br />
              
              <form> 
              <div id='form' style = {formStyle}>


      {/* <TextArea 
        label="Street Address"
        readOnly={false}
        required={false}
        disabled={false}
        error={false}
        errorText='Enter a valid address.'
        helperText='For example: 123 Verizon St'
        tooltipTitle='Check the formatting of your address'
        tooltipContent="House/Building number then street name"
        maxLength={200} /> */}

        <Input 
        type="text" 
        label="First name"
        name='first_name'
        width="50%"
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid name.'
        /> <br /> <br /> 

      <Input 
        type="text" 
        width="50%"
        label="Last name"
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid name.'
        /> <br /> <br />

      <Input 
        type="tel" 
        width="50%"
        label="Phone number"
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid phone number.'
        defaultValue={'1234567890'}
      /> <br /> <br /> 

        <Input 
        type="email" 
        label="Email"
        width="50%"
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid email.'
        /> <br /> <br /> 

        <DropdownSelect 
        label="Location"
        width="50%"
        errorText='Select a state'
        error={false}
        disabled={false}
        readOnly={false}
        inlineLabel={false}
        >
            <option></option>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
            <option>Arkansas</option>
            <option>California</option>
            <option>Colorado</option>
            <option>Connecticut</option>
            <option>Delaware</option>
            <option>District Of Columbia</option>
            <option>Florida</option>
            <option>Georgia</option>
            <option>Hawaii</option>
            <option>Idaho</option>
            <option>Illinois</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Kansas</option>
            <option>Kentucky</option>
            <option>Louisiana</option>
            <option>Maine</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>Michigan</option>
            <option>Minnesota</option>
            <option>Mississippi</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Jersey</option>
            <option>New Mexico</option>
            <option>New York</option>
            <option>North Carolina</option>
            <option>North Dakota</option>
            <option>Ohio</option>
            <option>Oklahoma</option>
            <option>Oregon</option>
            <option>Pennsylvania</option>
            <option>Rhode Island</option>
            <option>South Carolina</option>
            <option>South Dakota</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Utah</option>
            <option>Vermont</option>
            <option>Virginia</option>
            <option>Washington</option>
            <option>West Virginia</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>
        </DropdownSelect> <br /> <br /> 


      <Input 
        type="text" 
        width="50%"
        label="Languages"
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid name.'
        /> <br /> <br />

        <Input 
          type="text" 
          width="50%"
          label="University"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid University.'
        /> <br /> <br /> 

        <Input 
          type="text" 
          width="50%"
          label="University location"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter valid university location.'
        /> <br /> <br /> 

        <Input 
          type="text" 
          width="50%"
          label="Major"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid major.'
        /> <br /> <br /> 

        <Input 
          type="text" 
          width="50%"
          label="GPA"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid GPA.'
        /> <br /> <br /> 

      <Input 
          type="text" 
          width="50%"
          label="coursework"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter valid coursework.'
        /> <br /> <br /> 

      <RadioButtonGroup
          onChange={() => {}}
          error={false}
          data={[
            {
              name: 'group',
              label: 'I have work experience',
              children: 'You will be prompted to enter a maximum of 3 work experiences',
              value: 'radioOne',
              ariaLabel: 'radio one',
              disabled: false
            },
            {
              name: 'group',
              label: 'I do not have work experience',
              children: 'You will not be asked to enter any work experiences',
              value: 'radioTwo',
              ariaLabel: 'radio two',
            }
          ]}
        /> <br /> <br /> 


        <Input 
          type="text" 
          width="50%"
          label="Company 1"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />


        <Input 
          type="text" 
          width="50%"
          label="Job Title 1"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

      <DatePicker
        dateFormat="MM/DD/YYYY"
        width="70.75%"
        alwaysOpen={false}
        readOnly={false}
        disabled={false}
        surface="light"
        minDate={new Date(1998, 1, 1)}
        label="Start Date 1"
        helperText="Choose the correct date for your appointment"
        helperTextPlacement="bottom"
      /> <br /> <br /> 

      <DatePicker
        dateFormat="MM/DD/YYYY"
        width="70.75%"
        alwaysOpen={false}
        readOnly={false}
        disabled={false}
        surface="light"
        minDate={new Date(1998, 1, 1)}
        label="End Date 1"
        helperText="Choose the correct date for your appointment"
        helperTextPlacement="bottom"
      /> <br /> <br /> 

        <Input 
          type="text" 
          width="50%"
          label="Description 1"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

      <Input 
          type="text" 
          width="50%"
          label="Company 2"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />


        <Input 
          type="text" 
          width="50%"
          label="Job Title 2"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

        <Input 
          type="date" 
          label="Start Date 2"
          width="50%"
          readOnly={false}
          required={false}
          disabled={false}
          error={false}
          errorText='Enter a valid date.'
          helperText='For example: 123 Verizon St'
          helperTextPlacement="bottom"
          tooltipTitle='Check the formatting of your address'
          tooltipContent="House/Building number then street name" /> <br /> <br /> 

        <Input 
          type="date" 
          label="End Date 2"
          width="50%"
          readOnly={false}
          required={false}
          disabled={false}
          error={false}/> <br /> <br /> 

        <Input 
          type="text" 
          width="50%"
          label="Description 2"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

      <Input 
          type="text" 
          width="50%"
          label="Company 3"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />


        <Input 
          type="text" 
          width="50%"
          label="Job Title 3"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

        <Input 
          type="date" 
          label="Start Date 3"
          width="50%"
          readOnly={false}
          required={false}
          disabled={false}
          error={false}
          errorText='Enter a valid date.'
          helperText='For example: 123 Verizon St'
          helperTextPlacement="bottom"
          tooltipTitle='Check the formatting of your address'
          tooltipContent="House/Building number then street name" /> <br /> <br /> 

        <Input 
          type="date" 
          label="End Date 3"
          width="50%"
          readOnly={false}
          required={false}
          disabled={false}
          error={false}/> <br /> <br /> 

        <Input 
          type="text" 
          width="50%"
          label="Description 3"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

      <RadioButtonGroup
          onChange={() => {}}
          error={false}
          data={[
            {
              name: 'group',
              label: 'I have project experience',
              children: 'You will be prompted to enter a maximum of 3 project experiences',
              value: 'radioOne',
              ariaLabel: 'radio one',
              disabled: false
            },
            {
              name: 'group',
              label: 'I do not have project experience',
              children: 'You will not be asked to enter any project experiences',
              value: 'radioTwo',
              ariaLabel: 'radio two',
            }
          ]}
        /> <br /> <br /> 

      <Input 
          type="text" 
          width="50%"
          label="Project title 1"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

      <Input 
          type="text" 
          width="50%"
          label="Project description 1"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

    <Input 
          type="text" 
          width="50%"
          label="Project title 2"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

      <Input 
          type="text" 
          width="50%"
          label="Project description 2"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

    <Input 
          type="text" 
          width="50%"
          label="Project title 3"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />

      <Input 
          type="text" 
          width="50%"
          label="Project description 3"
          readOnly={false}
          required={true}
          disabled={false}
          error={false}
          errorText='Enter a valid name.'
        /> <br /> <br />


            <div style={resumeSubmitButton}> 
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
            </div>

              </div>
              </form>
        </div>


this is from react apps.js file
i want to pass this data to node js and then create api to save the data in psql DB
