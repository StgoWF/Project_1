document.addEventListener('DOMContentLoaded', function() {
    displaySavedFlightPlans();
});

function displaySavedFlightPlans() {
    // Retrieve saved flights from local storage
    let savedFlights = localStorage.getItem('savedFlights');
    savedFlights = savedFlights ? JSON.parse(savedFlights) : [];

    const savedFlightsPanel = document.getElementById('savedFlightsPanel');
    if (!savedFlightsPanel) {
        console.error('Element with ID "savedFlightsPanel" not found.');
        return;
    }

    savedFlightsPanel.innerHTML = ''; // Clear existing content

    if (savedFlights.length === 0) {
        savedFlightsPanel.innerHTML = '<p>No saved flight plans.</p>';
        return;
    }

    savedFlights.forEach(flight => {
        // Ensure flight properties exist before trying to access them
        const fromCity = flight.fromCity || 'Unknown city';
        const toCity = flight.toID || 'Unknown city';
        const departDate = flight.departureDate || 'N/A';
        const returnDate = flight.arrivalDate || 'N/A';
        const adults = flight.passengers && flight.passengers.adults ? flight.passengers.adults : 'N/A';
        const children = flight.passengers && flight.passengers.children ? flight.passengers.children : 'N/A';
        const infants = flight.passengers && flight.passengers.infants ? flight.passengers.infants : 'N/A';

        const flightElement = document.createElement('div');
        flightElement.className = 'saved-flight';
        flightElement.innerHTML = `
            <h3>${fromCity} to ${toCity}</h3>
            <p>Depart: ${departDate}</p>
            <p>Return: ${returnDate}</p>
            <p>Passengers: Adults ${adults}, Children ${children}, Infants ${infants}</p>
        `;

        savedFlightsPanel.appendChild(flightElement);
    });
}
