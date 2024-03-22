// -------------------------
// DOMContentLoaded Event Listeners
// -------------------------
document.addEventListener('DOMContentLoaded', function() {
    initializePassengerQuantityButtons();
    initializeDropdownToggle();
    initializeTripTypeChangeListener();
    initializeDateInputListeners();
    initializeDropdownHolderClick();
    initializeFlightSearch();
});

// -------------------------
// Passenger Quantity Modification Functions
// -------------------------
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

function initializePassengerQuantityButtons() {
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
}

// -------------------------
// Dropdown Display Functions
// -------------------------
function toggleDropdown() {
    var dropdown = document.getElementById("passengerDropdownContent"); 
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function initializeDropdownToggle() {
    var passengerBtn = document.getElementById('passengerDropdown');
    if (passengerBtn) {
        passengerBtn.addEventListener('click', toggleDropdown);
    }
}

function initializeDropdownHolderClick() {
    document.querySelector("#passengerDropdownHolder").addEventListener("click",function(event) {
        event.stopPropagation()
    });
}

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

// -------------------------
// Date Input Functions
// -------------------------
function initializeDateInputListeners() {
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
}

// -------------------------
// Trip Type Change Functions
// -------------------------
function handleTripTypeChange() {
    var tripTypeSelector = document.getElementById('trip-type');
    var multiCityContainer = document.getElementById('multi-city-container');

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
        multiCityContainer.innerHTML = '';
    }
}

function initializeTripTypeChangeListener() {
    var tripTypeSelector = document.getElementById('trip-type');
    tripTypeSelector.addEventListener('change', handleTripTypeChange);
    handleTripTypeChange();
}

// -------------------------
// Multi-City Input Fields Functions
// -------------------------

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
}

// -------------------------
// Flight Search Functions
// -------------------------

function initializeFlightSearch() {
    document.querySelector(".search-btn").addEventListener("click", searchEngine);
}
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
        // Create a container element for each item
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container'); // You can add a class for styling if needed
        
        const Airfare = item.priceBreakdown.total.units 
        const Airefareholder = document.createElement('div');
        Airefareholder.textContent = "Price: " + Airfare
        itemContainer.appendChild(Airefareholder)
    
        // Append the item container to the content panel
        contentPanel.appendChild(itemContainer);
    });
        } catch (error) {
            console.error(error);
        }
    }

// -------------------------
// Fetch API Data Function
// -------------------------

async function fetchApiData() {
    try {
        console.log('Fetching API data...');
        var response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        var result = await response.json();
        console.log('API response:', result);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchApiData();

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
    // Create a container element for each item
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container'); // You can add a class for styling if needed
    
    const Airfare = item.priceBreakdown.total.units 
    const Airefareholder = document.createElement('div');
    Airefareholder.textContent = "Price: " + Airfare
    itemContainer.appendChild(Airefareholder)

    // Append the item container to the content panel
    contentPanel.appendChild(itemContainer);
});
    } catch (error) {
        console.error(error);
    }
}