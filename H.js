The error "Missing Authentication Token" typically occurs when interacting with AWS services, such as AWS Lambda or AWS API Gateway, where authentication is required but not provided. In your case, since you're working with PostgreSQL and Node.js, the issue might lie in how you're trying to execute the SQL query using `pool.query`.

Here are a few steps to fix this issue:

1. **Ensure Database Connection**: Make sure your PostgreSQL database connection (`this.db`) is correctly initialized in your `ResumeDataDAO` constructor. You're using `knex` to connect to PostgreSQL, which looks correct based on your code.

2. **Correct Usage of `pool.query`**: Since you're using `knex` to manage your database connection (`this.db`), you should use `this.db.raw` instead of `pool.query`. Here’s how you should modify your `sendUserData` method:

```javascript
async sendUserData(first_name, last_name, phone, email, location, languages) {
    try {
        const query = 'INSERT INTO user_data (first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [first_name, last_name, phone, email, location, languages];
        await this.db.raw(query, values);
        return 'Data saved successfully';
    } catch (error) {
        console.error('Failed to save data:', error.message);
        throw error;
    }
}
```

In this revised version:

- Use `this.db.raw` to execute raw SQL queries through `knex`.
- Replace `$1`, `$2`, etc., with `?` as placeholders, which is the syntax used by `knex` for parameterized queries.
- Ensure proper error handling to catch any issues with database queries.

3. **Handling Responses**: Adjust the response handling in your Express route where you call `sendUserData`. For example:

```javascript
app.post('/saveUserData', async (req, res) => {
    const { first_name, last_name, phone, email, location, languages } = req.body;
    const resumeDataDAO = new ResumeDataDAO();
    try {
        const result = await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).send('Failed to save data');
    }
});
```

In this route handler:

- Instantiate `ResumeDataDAO` to use `sendUserData`.
- Handle success (`res.status(200)`) and error (`res.status(500)`) responses appropriately.

By following these steps, you should be able to resolve the "Missing Authentication Token" error and properly insert data into your PostgreSQL database using Node.js and `knex`.
