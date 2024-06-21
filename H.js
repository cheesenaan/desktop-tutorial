const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
    // Set the Content-Type to text/html
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Write HTML content with a button for redirection
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello World</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    text-align: center;
                    padding: 50px;
                }
                h1 {
                    color: #333;
                }
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hello World!</h1>
                <button onclick="redirectToAnotherPage()">Go to Another Page</button>
            </div>

            <script>
                function redirectToAnotherPage() {
                    // Redirect to another HTML page
                    window.location.href = '/anotherpage';
                }
            </script>
        </body>
        </html>
    `);

    // End the response
    res.end();
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
