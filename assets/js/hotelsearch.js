// Reference to the search form
const searchForm = document.getElementById('search-form');

// Reference to the container of popular destinations
const popularDestinationsSection = document.getElementsByClassName('destinations-container')[0];

// Reference to the container where search results will be displayed
const searchResultsSection = document.getElementById('search-results');

// Function to hide popular destinations and show search results container
function displaySearchResults() {
  console.log("Displaying search results...");
  popularDestinationsSection.style.display = 'none'; // Hide popular destinations
  searchResultsSection.style.display = 'flex'; // Show search results
  searchResultsSection.style.flexDirection = 'column'; // Ensure results are displayed in a column
  searchResultsSection.style.alignItems = 'center'; // Center align the results
}

// Event listener for the search form submission
searchForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("Form submitted.");
  const destinationInput = document.getElementById('destination');
  const destination = destinationInput.value.trim(); // Get the trimmed value of the input
  console.log("Destination:", destination);

  if (destination) { // Check if the destination input is not empty
    console.log("Fetching location ID for:", destination);
    await fetchLocationId(destination);
  } else {
    alert('Please enter a destination.'); // Alert the user if the destination input is empty
  }
});

// Function to fetch the location ID based on the destination name
async function fetchLocationId(destination) {
  const url = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${encodeURIComponent(destination)}&locale=en-gb`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7727d5bafemsh172b82c5a031d9cp18630ejsnb6d5dde15717', // Replace 'YOUR_API_KEY' with your actual RapidAPI key
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const locations = await response.json();
    console.log("Locations fetched:", locations);
    if (locations.length > 0) {
      // Assuming the first location is the correct one
      const destId = locations[0].dest_id;
      console.log("Using destId:", destId);
      searchHotels(destId);
    } else {
      console.log("No locations found.");
    }
  } catch (error) {
    console.error("Error fetching location ID:", error);
  }
}

  

  

// Add your existing searchHotels function here, with console logs added
// to indicate start, success, and error states.
// Function to search hotels based on the destination ID
async function searchHotels(destId) {
    // Formato de fechas y otros datos necesarios para la búsqueda, ajusta según tu formulario
    const checkInDate = '2024-04-01';
    const checkOutDate = '2024-04-10';
    const adultsNumber = document.getElementById('guests').value || 1; // Default to 1 adult if not specified
    const roomNumber = 1; // Example: assuming one room
  
    console.log("Preparing to search for hotels with destination ID:", destId);
    console.log(`Check-in date: ${checkInDate}, Check-out date: ${checkOutDate}, Adults: ${adultsNumber}, Room Number: ${roomNumber}`);
  
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${checkOutDate}&order_by=popularity&filter_by_currency=AED&room_number=${roomNumber}&dest_id=${destId}&dest_type=city&adults_number=${adultsNumber}&checkin_date=${checkInDate}&locale=en-gb&units=metric&include_adjacency=true&page_number=0`;
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '7727d5bafemsh172b82c5a031d9cp18630ejsnb6d5dde15717', // Replace with your actual RapidAPI key
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
    };
  
    try {
      console.log("Requesting:", url);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const hotels = await response.json();
      console.log("Hotels fetched:", hotels);
  
      // Clear previous search results
      searchResultsSection.innerHTML = '';
  
      if (hotels && hotels.result) {
        hotels.result.forEach(hotel => {
            const hotelElement = document.createElement('div');
            hotelElement.className = 'card'; // Asegúrate de tener esta clase en tu CSS
            hotelElement.innerHTML = `
                <h3>${hotel.hotel_name || 'Nombre no disponible'}</h3>
                <p>${hotel.address || 'Dirección no disponible'}</p>
                <img src="${hotel.main_photo_url || ''}" alt="${hotel.hotel_name}" style="width:100px;height:auto;">
            `; // Ajusta según los datos disponibles en tu objeto de hotel

            // Añade el elemento del hotel al contenedor de resultados de búsqueda
            searchResultsSection.appendChild(hotelElement);
        });
    } else {
        searchResultsSection.innerHTML = '<p>No se encontraron hoteles.</p>';
    }
  
      // Make sure to call displaySearchResults() if not called previously
      displaySearchResults();
  
    } catch (error) {
      console.error("Error fetching hotels:", error);
      searchResultsSection.innerHTML = `<p>Error fetching hotels: ${error.message}</p>`;
    }
  }
  