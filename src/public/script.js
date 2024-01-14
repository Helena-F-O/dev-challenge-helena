/**
 * Function to perform a search using the provided search term.
 */
function search() {
  // Get the search term from the input field
  const searchTerm = document.getElementById('searchInput').value;

  // Fetch search results from the server API
  fetch('/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `searchTerm=${searchTerm}`,
  })
  .then(response => response.json())
  .then(data => displayResults(data.results))
  .catch(error => console.error('Error:', error));
}

/**
 * Function to map filenames to more user-friendly titles.
 * @param {string} filename - The name of the file to get the title for.
 * @returns {string} - The user-friendly title for the given filename.
 */
function getTitleFromFilename(filename) {
  const titleMap = {
    'equipments.json': 'Equipamentos',
    'materials.json': 'Materiais',
    'purchase_orders.json': 'Pedidos de Compra',
    'sales_orders.json': 'Pedidos de Venda',
    'workforce.json': 'Força de Trabalho',
  };

  return titleMap[filename] || 'Formato não reconhecido';
}

/**
 * Function to display search results on the webpage.
 * @param {Array} results - An array of search results to be displayed.
 */
function displayResults(results) {
  // Get the container where results will be displayed
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  // If no results are found, display a message and return
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    return;
  }

  // Count the total number of results
  let totalResults = 0;

  // Iterate through each expected file type
  const expectedFileTypes = ['equipments.json', 'materials.json', 'purchase_orders.json', 'sales_orders.json', 'workforce.json'];
  expectedFileTypes.forEach(fileType => {
    const result = results.find(result => result.arquivo === fileType);

    // Add the title based on the filename
    const resultBox = document.createElement('div');
    resultBox.classList.add('result-box');

    const boxTitle = document.createElement('div');
    boxTitle.classList.add('box-title');
    resultBox.appendChild(boxTitle);

    const title = document.createElement('h3');
    boxTitle.appendChild(title);

    const titleTextDiv = document.createElement('div');
    titleTextDiv.classList.add('title-text');
    title.appendChild(titleTextDiv);

    const itemCountDiv = document.createElement('div');
    itemCountDiv.classList.add('item-count');
    boxTitle.appendChild(itemCountDiv);

    const titleText = getTitleFromFilename(fileType);
    const itemCount = result ? result.conteudo.length : 0;

    titleTextDiv.textContent = titleText;
    itemCountDiv.textContent = `(${itemCount} resultado${itemCount !== 1 ? 's' : ''})`;

    // Add the results in a list
    const contentList = document.createElement('table');
    contentList.classList.add('result-table');

    // If the file type is found, display the results
    if (result) {
      totalResults += itemCount;

      result.conteudo.forEach(item => {
        const listItem = document.createElement('tr');
        listItem.classList.add('list-item-match');
        const columnId = document.createElement('td');
        columnId.classList.add('column-id');
        const columnDescription = document.createElement('td');
        columnDescription.classList.add('column-description');
        const columnQTD = document.createElement('td');
        columnQTD.classList.add('column-qtd');
        listItem.appendChild(columnId);
        listItem.appendChild(columnDescription);
        listItem.appendChild(columnQTD);

        

        // Format specific to each file type
        let itemMatchesSearch = false;
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        switch (fileType) {
          case 'equipments.json':
            itemMatchesSearch = item.EquipmentID.toLowerCase().includes(searchTerm) || item.EquipmentName.toLowerCase().includes(searchTerm);
            break;

          case 'materials.json':
            itemMatchesSearch = item.MaterialID.toLowerCase().includes(searchTerm) || item.MaterialName.toLowerCase().includes(searchTerm);
            break;

          case 'purchase_orders.json':
          case 'sales_orders.json':
            itemMatchesSearch = item.MaterialID.toLowerCase().includes(searchTerm) || item.MaterialName.toLowerCase().includes(searchTerm) || item.Quantity.toString().includes(searchTerm);
            break;

          case 'workforce.json':
            itemMatchesSearch = item.WorkforceID.toString().toLowerCase().includes(searchTerm) || item.Name.toLowerCase().includes(searchTerm) || item.Shift.toLowerCase().includes(searchTerm);
            break;

          default:
            // Display if the file type is not recognized
            listItem.textContent = 'Formato não reconhecido.';
            break;
        }

        

        // If the item matches the search, display it
        if (itemMatchesSearch) {
          switch (fileType) {
            case 'equipments.json':
              columnId.textContent = `#${item.EquipmentID}`;
              columnDescription.textContent = `${item.EquipmentName} `
              break;

            case 'materials.json':
              columnId.textContent = `#${item.MaterialID}`;
              columnDescription.textContent = `${item.MaterialName}`;
              break;

            case 'purchase_orders.json':
              columnId.textContent = `#${item.MaterialID}`;
              columnDescription.textContent = `${item.MaterialName}`
              columnQTD.textContent = `Qtd: ${item.Quantity} pç`;
              break;

            case 'sales_orders.json':
              columnId.textContent = `#${item.MaterialID}`;
              columnDescription.textContent = `${item.MaterialName}`
              columnQTD.textContent = `Qtd: ${item.Quantity} pç`;
              break;

            case 'workforce.json':
              columnId.textContent = `#${item.WorkforceID}`;
              columnDescription.textContent = `${item.Name}`;
              columnQTD.textContent = `Turno: ${item.Shift}`;
              break;

            default:
              // Display if the file type is not recognized
              listItem.textContent = 'Formato não reconhecido.';
              break;
          }

          contentList.appendChild(listItem);
        }
      });
    } else {
      // If the file type is not found, add a message
      const listItem = document.createElement('li');
      listItem.textContent = 'Nenhum Item Encontrado';
      contentList.appendChild(listItem);
    }

    // Append the result box to the container
    resultBox.appendChild(contentList);
    resultsContainer.appendChild(resultBox);
  });

  // Display the total number of results
  const totalResultsLine = document.createElement('p');
  totalResultsLine.classList.add("totalResultsLine");
  totalResultsLine.textContent = `Foram encontrados ${totalResults} resultado${totalResults !== 1 ? 's' : ''}.`;
  resultsContainer.insertBefore(totalResultsLine, resultsContainer.firstChild);
}
