/* looks for the table-body id on index.html */
const tableBody = document.getElementById('table-body');


const getFlight = () => {
  /* Method to grab the flight data from localhost:8000/flights */
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
  /* method to populate the table on index.html takes a list and loops through it */

  for (const flight of flights) {
    const tableRow = document.createElement('tr');
    const tableIcon = document.createElement('td');
    tableIcon.textContent = '✈';
    tableRow.append(tableIcon);

    /*creates a flight detail object */
    const flightDetails = {

      time: new Date(flight[11] * 1000).toLocaleTimeString("en-UK").slice(0, 5),
      departure: flight[12],
      destination: flight[13],
      flight: flight[17]
    }

    /* Nested loop to  loop through flightDetail object to create an array which will
    make it look like a tile on a flipper board you get at airports */
    for (const flightDetail in flightDetails) {
      const tableCell = document.createElement('td');
      const word = Array.from(flightDetails[flightDetail])

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement('div');

        /* Timeout to add a delay to the table showing for each element that is displayed on index.html */
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
