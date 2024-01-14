# MultiSearch Web Application

A web application for conducting searches across various data files, designed for a job application test.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contact](#contact)

## Introduction

The MultiSearch web application is a simple search engine designed as a part of a job application test. It allows users to search through different data files and display results on the webpage.

## Technologies Used

- [Express](https://expressjs.com/): A web application framework for Node.js.
- [Node.js](https://nodejs.org/): A JavaScript runtime for server-side development.
- [Body-parser](https://www.npmjs.com/package/body-parser): Middleware for handling URL-encoded bodies in Express.

## File Structure

- `public/`: Contains static files like HTML, CSS, and client-side JavaScript.
- `imagens/`: Holds images used in the project.
- `script.js`: JavaScript file handling client-side functionality.
- `style.css`: Cascading Style Sheets for styling.
- `server.js`: Node.js file containing server-side logic.
- `data/`: Directory storing JSON files for data.

## Setup and Installation

1. Clone the repository: `git clone https://github.com/Helena-F-O/dev-challenge-helena.git`
2. Navigate to the project directory: `cd src`
3. To be sure, select the src folder and open a terminal integrated into the folder for the next steps.
4. Install dependencies: `npm install 18` e `npm install express`
5. Start the server: `node server.js`
6. Open the project in a web browser: [http://localhost:3000](http://localhost:3000)
7. To check the swagger documentation, you must follow the following path on the website page: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) (Swagger documentation was integrated into the project)

## Usage

To use the application, open it in a web browser, enter a search term, and click the search button. Results will be displayed based on the entered search term.

## Documentation

All code files in this project are thoroughly commented to enhance understanding and maintainability. Here's a brief overview of each code file:

### HTML (`index.html`)

The HTML file serves as the main structure for the web application. It includes elements for the search input, search button, and result container.

### CSS (`style.css`)

The CSS file contains styles for enhancing the visual presentation of the web application. It defines styles for the body, container, search input, button, result box, and other elements.

### JavaScript (`script.js`)

1. `search()`

This function is responsible for handling the search functionality. It retrieves the search term from the input field, sends a request to the server API with the search term, and displays the results on the webpage.

2. `getTitleFromFilename(filename)`

This function maps filenames to more user-friendly titles. It is used in the display results function to present meaningful titles for each search result.

3. `displayResults(results)`

The `displayResults` function takes an array of search results and dynamically generates HTML elements to display them on the webpage. It formats and presents the results based on the file type.

### Node.js (`server.js`)

The Node.js file contains server-side logic to handle incoming requests. It sets up an Express server, defines routes, and performs search operations on JSON data files. The server listens on a specified port for incoming connections.

### Note to Reviewer

All code files are thoroughly commented to provide clarity and guidance. Each function is documented with inline comments, and the overall structure of the project is designed to be modular and easy to understand. If there are any specific points you would like more clarification on, feel free to reach out.

## Contact

For any inquiries or further information, please don't hesitate to contact me:

Helena Felicia de Oliveira Avelino

    Email: helenafeliciaoliveira@gmail.com

I'm excited about the opportunity and looking forward to any feedback or discussions related to the job application test. Feel free to reach out—I appreciate your consideration! 😊