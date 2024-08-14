const handleDateChange = (date, name) => {
  setFormData(prevData => ({
    ...prevData,
    [name]: date
  }));
};


<DatePicker
  id="startDate1"
  label="Start Date"
  dateFormat="MM/DD/YYYY"
  onChange={(date) => handleDateChange(date, 'startDate1')}
  alwaysOpen={false}
  readOnly={false}
  disabled={false}
  surface="light"
  minDate={new Date(1998, 1, 1)}
  helperText="Enter your start date"
  helperTextPlacement="bottom"
  width="70.7%"
/>


    <DatePicker
  id="endDate1"
  label="End Date"
  dateFormat="MM/DD/YYYY"
  onChange={(date) => handleDateChange(date, 'endDate1')}
  alwaysOpen={false}
  readOnly={false}
  disabled={false}
  surface="light"
  minDate={new Date(1998, 1, 1)}
  helperText="Enter your end date"
  helperTextPlacement="bottom"
  width="70.7%"
/>
