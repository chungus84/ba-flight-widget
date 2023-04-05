const tableBody = document.getElementById('table-body');

const getFlight = () => {
  fetch('http://localhost:8000/flights')
    .then(response => response.json())
    .then(flights => {
      console.log(flights)
      populateTable(flights)
    })
    .catch(err => console.log(err))
}

getFlight();

const populateTable = (flights) => {
  for (const flight of flights) {
    const tableRow = document.createElement('tr');
    const tableIcon = document.createElement('td');
    tableIcon.textContent = '✈';
    tableRow.append(tableIcon);

    const flightDetails = {

      time: new Date(flight[11] * 1000).toLocaleTimeString("en-UK").slice(0, 5),
      departure: flight[12],
      destination: flight[13],
      flight: flight[17]
    }
    for (const flightDetail in flightDetails) {
      const tableCell = document.createElement('td');
      const word = Array.from(flightDetails[flightDetail])

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement('div');

        setTimeout(() => {
          letterElement.classList.add('flip');
          letterElement.textContent = letter;
          tableCell.append(letterElement)
        }, 100 * index);

      }

      tableRow.append(tableCell);
    }

    tableBody.append(tableRow);
  }

}
