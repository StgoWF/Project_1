function displaySavedFlightDetails() {
    let savedData = localStorage.getItem('savedFlights');
    let savedFlightDetails;
    console.log(savedData)
    if (savedData) {
        try {
            savedFlightDetails = JSON.parse(savedData);
        } catch (error) {
            console.error('Error parsing saved flight details:', error);
            return;
        }

        if (savedFlightDetails && Array.isArray(savedFlightDetails)) {
            let container = document.getElementById('savedFlightDetailsContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'savedFlightDetailsContainer';
                document.body.appendChild(container);
            }

            container.innerHTML = '';

            savedFlightDetails.forEach((flight, index) => {
                let flightElement = document.createElement('div');
                flightElement.className = 'flight-detail';

                let segment = flight.segments[0];
                let travellerCount = flight.travellerPrices.length;

                flightElement.innerHTML = `
                    <h3>Flight Plan ${index + 1}</h3>
                    <p>From City: ${segment.departureAirport.cityName}</p>
                    <p>To City: ${segment.arrivalAirport.cityName}</p>
                    <p>Departure Date: ${new Date(segment.departureTime).toLocaleDateString()}</p>
                    <p>Arrival Date: ${new Date(segment.arrivalTime).toLocaleDateString()}</p>
                    <p>Number of Passengers: ${travellerCount}</p>
                `;

                container.appendChild(flightElement);
            });
        }
    } else {
        console.log('No saved flight details found.');
    }
}

displaySavedFlightDetails();