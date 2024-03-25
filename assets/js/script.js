// Fetch data from Booking.com API.
var url = 'https://booking-com15.p.rapidapi.com/api/v1/meta/getLanguages';
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8d3728dcaemsh32efdac6013419ap12f34bjsned7b35d9a858',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
};

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

// Fetch data from Ske Scrapper API.
var Flight_url = 'https://sky-scrapper.p.rapidapi.com/api/v1/checkServer';
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8d3728dcaemsh32efdac6013419ap12f34bjsned7b35d9a858',
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
};

async function fetchApiData() {
    try {
        console.log('Fetching API data...');
        var response = await fetch(Flight_url, options);
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


document.getElementById('loadHotelPlans').addEventListener('click', function() {
    fetch('hotelplans.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
      });
  });
  
  document.getElementById('loadFlightPlans').addEventListener('click', function() {
    fetch('flightplans.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
      });
  });