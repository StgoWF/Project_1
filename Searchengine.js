var imageArray = ['./assets/images/Ui MockUps/group.jpeg','./assets/images/Ui MockUps/Hotel Search.jpeg'];
var currentImageIndex = 0
// Function to modify the quantity of passengers
function modifyQuantity(passengerType, delta) {
    var input = document.getElementById(passengerType);
    var currentValue = parseInt(input.value, 10);
    currentValue += delta;

    if (currentValue < parseInt(input.min, 10)) {
        currentValue = parseInt(input.min, 10);
    }

    input.value = currentValue;
}

// Toggle Dropdown Display
function toggleDropdown() {
    var dropdown = document.getElementById("passengerDropdownContent"); 
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Initialize event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners for Decrease and Increase Buttons
    var decreaseButtons = document.querySelectorAll('.decrease');
    var increaseButtons = document.querySelectorAll('.increase');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            var type = this.closest('.passenger-count').querySelector('input[type=number]').id;
            modifyQuantity(type, -1);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            var type = this.closest('.passenger-count').querySelector('input[type=number]').id;
            modifyQuantity(type, 1);
        });
    });

    // Toggle Dropdown for passenger button
    var passengerBtn = document.getElementById('passengerDropdown');
    if (passengerBtn) {
        passengerBtn.addEventListener('click', toggleDropdown);
    }
});
document.querySelector("#passengerDropdownHolder")
.addEventListener("click",function(event) {
    event.stopPropagation()
});
// Unified window onclick to handle outside click for closing dropdown
window.onclick = function(event) {
    if (!event.target.matches('#passengerDropdownHolder')) {
        var dropdowns = document.getElementsByClassName("passenger-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
};
document.addEventListener('DOMContentLoaded', function() {
    var departDateInput = document.getElementById('depart-date');
    var returnDateInput = document.getElementById('return-date');

    departDateInput.addEventListener('change', function() {
        if (departDateInput.value && returnDateInput.value) {
            if (departDateInput.value > returnDateInput.value) {
                returnDateInput.value = departDateInput.value;
            }
        }
    });

    returnDateInput.addEventListener('change', function() {
        if (departDateInput.value && returnDateInput.value) {
            if (returnDateInput.value < departDateInput.value) {
                departDateInput.value = returnDateInput.value;
            }
        }
    });
});
function handleTripTypeChange() {
    var tripTypeSelector = document.getElementById('trip-type');
    var multiCityContainer = document.getElementById('multi-city-container'); // This is a new div you need to add to your HTML for multi-city inputs

    if (tripTypeSelector.value === 'multicity') {
        multiCityContainer.innerHTML = `
            <div class="input-group">
                <label for="from-2">From</label>
                <input type="text" id="from-2" placeholder="Enter departure city">
            </div>
            <div class="input-group">
                <label for="to-2">To</label>
                <input type="text" id="to-2" placeholder="Enter destination city">
            </div>
            <div class="input-group">
                <label for="depart-date-2">Depart Date</label>
                <input type="date" id="depart-date-2">
            </div>
            <div class="input-group">
                <label for="return-date-2">Return Date</label>
                <input type="date" id="return-date-2">
            </div>`;
    } else {
        multiCityContainer.innerHTML = ''; // Clear the additional fields
    }
}


document.addEventListener('DOMContentLoaded', function() {
    var tripTypeSelector = document.getElementById('trip-type');
    tripTypeSelector.addEventListener('change', handleTripTypeChange);

    // Call it on page load in case multi-city is preselected
    handleTripTypeChange();
});
document.addEventListener('DOMContentLoaded', function() {
    var tripTypeSelector = document.getElementById('trip-type');
    var returnDateInput = document.getElementById('return-date');

    tripTypeSelector.addEventListener('change', function() {
        if (this.value === 'oneway') {
            // Hide or disable the return date input
            returnDateInput.style.display = 'none';
        } else {
            // Show the return date input
            returnDateInput.style.display = 'block';
        }
    });

    // Initial check in case the page loads with "One-way" preselected
    if (tripTypeSelector.value === 'oneway') {
        returnDateInput.style.display = 'none';
    }
});
// Function to add Multi-City input fields dynamically
let citySetCount = 1;
function addCityInputs() {
    citySetCount++;
    const container = document.getElementById('multi-city-container');
    const newCitySet = document.createElement('div');
    newCitySet.className = 'city-set';
    newCitySet.id = `city-set-${citySetCount}`;
    newCitySet.innerHTML = `
        <div class="input-group">
            <label for="from-${citySetCount}">From</label>
            <input type="text" id="from-${citySetCount}" placeholder="Enter departure city">
        </div>
        <div class="input-group">
            <label for="to-${citySetCount}">To</label>
            <input type="text" id="to-${citySetCount}" placeholder="Enter destination city">
        </div>
        <div class="input-group">
            <label for="depart-date-${citySetCount}">Depart Date</label>
            <input type="date" id="depart-date-${citySetCount}">
        </div>
        <div class="input-group">
            <label for="return-date-${citySetCount}">Return Date</label>
            <input type="date" id="return-date-${citySetCount}">
        </div>`;
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-city-set';
    deleteButton.textContent = '-';
    deleteButton.onclick = function() { deleteCitySet(citySetCount); };
    newCitySet.appendChild(deleteButton);

    container.insertBefore(newCitySet, container.lastChild);

    updateAddButton(container);
    let addButton = document.getElementById('add-city-button');
    addButton.classList.remove("Forced-Relative")
}

function updateAddButton(container) {
    let addButton = document.getElementById('add-city-button');
    if (!addButton) {
        addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.id = 'add-city-button';
        addButton.textContent = '+';
        addButton.addEventListener('click', addCityInputs);
        container.appendChild(addButton);
    }
}

function deleteCitySet(citySetId) {
    const citySet = document.getElementById(`city-set-${citySetId}`);
    if (citySet) {
        citySet.parentNode.removeChild(citySet);
        citySetCount--;
    }
    console.log(citySetCount)
if(citySetCount ===1) {
    let addButton = document.getElementById('add-city-button');
    addButton.classList.add("Forced-Relative")
}
}

// Function to handle Trip Type change
function handleTripTypeChange() {
    var tripTypeSelector = document.getElementById('trip-type');
    var returnDateGroup = document.getElementById('return-date-group');
    var multiCityContainer = document.getElementById('multi-city-container');

    // Handling One-way and Roundtrip options
    if (tripTypeSelector.value === 'oneway') {
        returnDateGroup.style.display = 'none';
    } else {
        returnDateGroup.style.display = 'block';
    }

    // Handling Multi-city option
    if (tripTypeSelector.value === 'multicity') {
        if (citySetCount === 1) {
            addCityInputs(); // Add the first set of fields
        }
    } else {
        multiCityContainer.innerHTML = '';
        citySetCount = 1;
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    var tripTypeSelector = document.getElementById('trip-type');
    tripTypeSelector.addEventListener('change', handleTripTypeChange);

    // Call handleTripTypeChange on page load to set the correct display state
    handleTripTypeChange();
});

document.querySelector(".search-btn").addEventListener("click", Searchengine)
function Searchengine (){

const searchData = {
    tripType: document.getElementById('trip-type').value,
    from: document.getElementById('from').value,
    to: document.getElementById('to').value,
    departDate: document.getElementById('depart-date').value,
    returnDate: document.getElementById('return-date').value,
    passengers: {
        adults: parseInt(document.getElementById('adults').value),
        children: parseInt(document.getElementById('children').value),
        infants: parseInt(document.getElementById('infants').value)
    },
    class: document.getElementById('class').value
};
console.log(searchData)
GetAirportIDfromcity(searchData.to).then(function(ToID){
    GetAirportIDfromcity(searchData.from).then(function(fromID){
        console.log (ToID)
        console.log (fromID)
SearchflightAPI(fromID, ToID, searchData.departDate)
    })
})
}

function GetAirportIDfromcity(city){
const url = 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query='+city;
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8d3728dcaemsh32efdac6013419ap12f34bjsned7b35d9a858',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
};

return fetch(url, options)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // Process the response data from your API
    console.log(data);
    var id= data.data[0].id

return id
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
}

function saveFlightOption(flightData) {
    // Retrieve saved flights from local storage
    let savedFlights = localStorage.getItem('savedFlights');
    savedFlights = savedFlights ? JSON.parse(savedFlights) : [];

    // Add the new flight data
    savedFlights.push(flightData);

    // Save the updated list back to local storage
    localStorage.setItem('savedFlights', JSON.stringify(savedFlights));

    console.log('Flight saved:', flightData);
}

function generateReferenceNumber() {
    return Math.floor(Math.random() * 10000000000); // Random 10-digit number
}

function sortFlights(flightOffers) {
    return flightOffers.sort((a, b) => {
        const priceA = a.priceBreakdown.total.units; // Assuming this is the price
        const durationA = a.segments[0].totalTime; // Assuming totalTime is in minutes

        const priceB = b.priceBreakdown.total.units;
        const durationB = b.segments[0].totalTime;

        // Compare by a combination of price and duration
        return (priceA * durationA) - (priceB * durationB);
    });
}

async function SearchflightAPI (toID, fromID, departDate){
    const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromID}&toId=${toID}&departDate=${departDate}`//&pageNo=1&adults=1&children=0%2C17&currency_code=AED`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8d3728dcaemsh32efdac6013419ap12f34bjsned7b35d9a858',
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        data.data.flightOffers.sort((a, b) => {
            const priceComparison = a.priceBreakdown.total.units - b.priceBreakdown.total.units;
            if (priceComparison !== 0) {
                return priceComparison;
            }
            return a.segments[0].totalTime - b.segments[0].totalTime;
        });
        
        const contentPanel = document.querySelector('.content-panel');

        const newDataElement = document.createElement('div');
        newDataElement.textContent = JSON.stringify(data); // Assuming 'data' is JSON data

        contentPanel.innerHTML = '';

        contentPanel.appendChild(newDataElement);
        console.log(newDataElement)
        console.log(contentPanel)
// Clear any existing content in the content panel
contentPanel.innerHTML = '';

// Iterate over the data and create HTML elements to display each piece of information
data.data.flightOffers.forEach(item => {
    if (currentImageIndex === imageArray.length){
        currentImageIndex = 0; 
    }
    // Create a container element for each item
  
    const card = document.createElement('section');
    card.classList.add('cardsection');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('imageContainer');
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('detailsContainer');
    const bookingContainer = document.createElement('div');
    bookingContainer.classList.add('bookingContainer');


    const Airfare = item.priceBreakdown.total.units;
    const AirefareElement = document.createElement('div');
    AirefareElement.classList.add("airfairprice");
    AirefareElement.textContent = "$ " + Airfare;
    bookingContainer.appendChild(AirefareElement);

    // Book button creation and logic
    const bookButton = document.createElement('button');
    bookButton.classList.add('bookButton');
    bookButton.textContent = 'Book Now';
    bookButton.addEventListener('click', function() {
        const referenceNumber = Math.floor(Math.random() * 10000000000);
        alert(`Enjoy your journey! Your flight is booked, and here is your reference number: ${referenceNumber}`);
        window.location.reload();
    });
    card.appendChild(bookButton);
    
    bookingContainer.appendChild(bookButton);

    const saveButton = document.createElement('button');
            saveButton.classList.add('saveButton');
            saveButton.innerHTML = '&#9825;'; // Heart symbol
            saveButton.addEventListener('click', function() {
                let savedFlights = localStorage.getItem('savedFlights');
                savedFlights = savedFlights ? JSON.parse(savedFlights) : [];

                if (!savedFlights.some(flight => flight.id === item.id)) {
                    saveFlightOption(item);
                    this.innerHTML = '&#9829;'; // Filled heart symbol
                    this.classList.add('saved');
                } else {
                    savedFlights = savedFlights.filter(flight => flight.id !== item.id);
                    localStorage.setItem('savedFlights', JSON.stringify(savedFlights));
                    this.innerHTML = '&#9825;'; // Empty heart symbol
                    this.classList.remove('saved');
                }
            });
            card.appendChild(saveButton);

    bookingContainer.appendChild(saveButton);

    const airlineCode = item.segments[0].legs[0].carriersData[0].name; // Adjust if the path is different
    const airlineCodeElement = document.createElement('div');
    airlineCodeElement.classList.add("airlineCode");
    airlineCodeElement.textContent = ` ${airlineCode}`;
    detailsContainer.appendChild(airlineCodeElement);

    const cardImg = imageArray[currentImageIndex];
    const cardImgElement = document.createElement('img');
    cardImgElement.classList.add("cardImg");
    cardImgElement.src = ` ${cardImg}`;
    imageContainer.appendChild(cardImgElement);

    const airlineLogo = item.segments[0].legs[0].carriersData[0].logo;
    const airlineLogoElement = document.createElement('img');
    airlineLogoElement.classList.add("airlineLogo");
    airlineLogoElement.src = `${airlineLogo}`;
    detailsContainer.appendChild(airlineLogoElement);



    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }

    const flightDuration = item.segments[0].totalTime;
    const formattedDuration = formatDuration(flightDuration);
    const flightDurationElement = document.createElement('div');
    flightDurationElement.classList.add("flightDuration");
    flightDurationElement.textContent = formattedDuration;
    detailsContainer.appendChild(flightDurationElement);


    const departAirport = item.segments[0].departureAirport.code;
    const departureAirportElement = document.createElement('div');
    departureAirportElement.classList.add("departAirport");
    departureAirportElement.textContent =` ${departAirport}`;
    detailsContainer.appendChild(departureAirportElement);

    const arrivalAirport = item.segments[0].arrivalAirport.code;
    const arrivalAirportElement = document.createElement('div');
    arrivalAirportElement.classList.add("arrivalAirport");
    arrivalAirportElement.textContent =` ${arrivalAirport}`;
    detailsContainer.appendChild(arrivalAirportElement);
    
    const departTime = new Date(item.segments[0].departureTime);
    const arrivalTime = new Date(item.segments[0].arrivalTime);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const formattedDepartTime = departTime.toLocaleTimeString('en-US', options);
    const formattedArrivalTime = arrivalTime.toLocaleTimeString('en-US', options);
    const departTimeElement = document.createElement('div');
    departTimeElement.classList.add("departTime");
    departTimeElement.textContent = formattedDepartTime;
    detailsContainer.appendChild(departTimeElement);
    const arrivalTimeElement = document.createElement('div');
    arrivalTimeElement.classList.add("arrivalTime");
    const isNextDay = departTime.getDate() !== arrivalTime.getDate() || 
                    departTime.getMonth() !== arrivalTime.getMonth() ||
                    departTime.getFullYear() !== arrivalTime.getFullYear();
    arrivalTimeElement.textContent = formattedArrivalTime + (isNextDay ? " Next Day" : "");
    detailsContainer.appendChild(arrivalTimeElement);

    departTimeElement.classList.add("departTime");
    departTimeElement.textContent = formattedDepartTime;
    detailsContainer.appendChild(departTimeElement);
    

    //card.appendChild(imageContainer);
    card.appendChild(imageContainer);
    card.appendChild(detailsContainer);
    card.appendChild(bookingContainer);

// ----------------------------------------------------------------
    // Append the item container to the content panel
    contentPanel.appendChild(card);
    currentImageIndex++;
});
    } catch (error) {
        console.error('There was an issue fetching flight data:', error);
    }
}





const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromID}&toId=${toID}&departDate=${departDate}`//&pageNo=1&adults=1&children=0%2C17&currency_code=AED`;
const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlightsMultiStops?fromId=${fromID}&toId=${toID}&departDate=${departDate}&fromId=${fromID}&toId=${toID}&departDate=${departDate}` //pageNo=1&adults=1&children=0%2C17&currency_code=AED';