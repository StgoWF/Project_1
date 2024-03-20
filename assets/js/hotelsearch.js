// Pointing to the DOM elements
const searchForm = document.getElementById('search-form');
const popularDestinationsSection = document.getElementById('popular-destinations-section');
const searchResultsSection = document.getElementById('search-results');

// Attaching an event listener to the search form
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting in the traditional way
  const destination = document.getElementById('destination').value;
  if (destination) {
    searchHotels(destination); // Call searchHotels with the entered destination
  }
});

// The searchHotels function will perform the API call and update the UI
async function searchHotels(destination) {
  const url = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${encodeURIComponent(destination)}&locale=en-gb`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'your-rapidapi-key',
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const results = await response.json();

    // Log the results to console (for testing purposes)
    console.log(results);

    // Replace the popular destinations section with the search results
    popularDestinationsSection.style.display = 'none'; // Hide popular destinations
    searchResultsSection.style.display = 'block'; // Show the search results section
    searchResultsSection.innerHTML = ''; // Clear previous results

    // Loop through the results and create elements for each hotel
    results.forEach(hotel => {
      const hotelElement = document.createElement('div');
      hotelElement.innerHTML = `
        <h3>${hotel.name}</h3>
        <p>${hotel.country}</p>
      `;
      searchResultsSection.appendChild(hotelElement);
    });
  } catch (error) {
    console.error('There was an error with the search operation:', error.message);
  }
}
