// pages/api/html-greet.js

export default function handler(req, res) {
    // Get the 'name' query parameter from the request
    const { name } = req.query;
  
    // Check if the 'name' parameter exists
    const greetingName = name ? name : "World";
  
    // Send the HTML response
    res.status(200).send(`
      <html>
        <body>
          <h1>Hello, ${greetingName}!</h1>
          <p>This is a ${name ? "personalized" : "default"} HTML response.</p>
        </body>
      </html>
    `);
  }
  