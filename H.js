The issue you're encountering seems to be related to how you're passing values to your SQL query in `ResumeDataDAO.js`. The values array should be an array of individual values, not a single string with comma-separated values. Here’s how you can fix it:

1. **Correct Values Array**: Ensure each value is a separate item in the array, corresponding to each placeholder in your SQL query.

2. **Async Function Parameters**: Ensure that `sendUserData` correctly accepts `req` and `res` parameters if you intend to handle HTTP responses directly in this function.

Here's how you can adjust your `sendUserData` method:

```javascript
async sendUserData(req, res) {
    try {
        const query = 'INSERT INTO user_data (user_id, first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [3, 'sulemaan', 'farooq', '9174565697', 'test@gmail.com', 'Alabama', 'spanish'];
        // Ensure values are individual items, not a single string
        
        // Logging the query and values for debugging
        console.log('Executing query:', query);
        console.log('With values:', values);

        await this.db.raw(query, values);
        res.status(200).send('Data saved successfully');
    } catch (err) {
        // Logging the error stack for detailed information
        console.error('Failed to save data:', err.stack);
        res.status(500).send('Failed to save data, error from Node.js DAO');
    }
}
```

### Explanation:

- **Values Array**: Each value is now separated into its own item in the array (`'3'` instead of `'3, sulemaan, farooq, 9174565697, test@gmail.com, Alabama, spanish'`).
- **Async Function Parameters**: Ensure that `sendUserData` accepts `req` and `res` parameters if this function is meant to handle HTTP responses directly. If not, remove these parameters and handle the response elsewhere in your application logic.

Make sure `req` and `res` are properly handled depending on the context where `sendUserData` is called, especially if you're integrating it with an API endpoint in your `index.js`.

If you continue to face issues, ensure that your database connection (`this.db`) is correctly initialized and accessible within `sendUserData`.
