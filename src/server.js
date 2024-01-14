// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // path to your Swagger definition file


// Creating an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Using body-parser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Configuring express.static middleware to serve static files in the 'public' and 'imagens' folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imagens')));

// Serving Swagger UI documentation at '/api-docs' using the Swagger definition from 'swagger.json'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for handling search requests
app.post('/api/search', (req, res) => {
  // Extracting the search term from the request body
  const searchTerm = req.body.searchTerm.toLowerCase();
  const dataPath = path.join(__dirname, '..', 'data');

  // Array to store search results
  const results = [];
  
  // Array of filenames to search through
  const fileNames = ['equipments.json', 'materials.json', 'purchase_orders.json', 'sales_orders.json', 'workforce.json'];

  // Loop through each filename
  fileNames.forEach((fileName) => {
    const filePath = path.join(dataPath, fileName);
    
    try {
      // Reading file content
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      try {
        // Parsing JSON content
        const jsonData = JSON.parse(fileContent);

        if (Array.isArray(jsonData)) {
          // Filtering items based on search term
          const fileResults = jsonData.filter(item => {
            const values = Object.values(item).map(value => String(value).toLowerCase());
            return values.some(val => val.includes(searchTerm));
          });

          // Adding non-empty results to the main results array
          if (fileResults.length > 0) {
            results.push({ arquivo: fileName, conteudo: fileResults });
          }
        }
      } catch (jsonError) {
        console.error(`Error parsing JSON in file ${fileName}:`, jsonError.message);
      }
    } catch (readError) {
      console.error(`Error reading file ${fileName}:`, readError.message);
    }
  });

  // Sending the results as JSON response
  res.json({ results });
});

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
