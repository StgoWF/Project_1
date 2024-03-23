// Variables to maintain the state of pagination
let currentPage = 1;
const resultsPerPage = 4;
let allResults = []; // Store all results fetched from the API here

// Function to calculate the total number of pages
function getTotalPages() {
  console.log("Calculating total pages...");
  return Math.ceil(allResults.length / resultsPerPage);
}

// Function to display the current page of results
function displayPage() {
  console.log(`Displaying page: ${currentPage}`);
  const checkInDate = document.getElementById('start-date').value;
  const checkOutDate = document.getElementById('end-date').value;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, allResults.length); // Ensure not to exceed array bounds
  const resultsToShow = allResults.slice(startIndex, endIndex);

  searchResultsSection.innerHTML = ''; // Clear the section before displaying new results
  console.log(`Showing results from ${startIndex} to ${endIndex}`);

  resultsToShow.forEach(hotel => {
    // Now directly using the structure you provided for creating cards
    const nights = calculateNights(checkInDate, checkOutDate);// This line assumes you have checkin and checkout dates in hotel object
    const nightText = nights === 1 ? 'night' : 'nights';
    const hotelElement = document.createElement('div');
    hotelElement.className = 'card';
    hotelElement.innerHTML = `
      <div class="card-image-container">   
        <img class="card-image" src="${hotel.max_photo_url || 'default-image.jpg'}" alt="${hotel.hotel_name}">
      </div>
      <div class="card-info">
        <h3 class="hotel-name">${hotel.hotel_name || 'Name not available'}</h3>
        <p class="hotel-score">${hotel.review_score_word || 'Score not available'} ${hotel.review_score || ''}</p>
        <p class="hotel-address">${hotel.distance_to_cc_formatted || 'Address not available'} from city center</p>
        <p class="hotel-nights">${nights} ${nightText}</p>
        <p class="hotel-price">${hotel.price_breakdown.all_inclusive_price || 'Price not available'} ${hotel.price_breakdown.currency || ''}</p>
        <button class="my-plans-btn" onclick="saveToMyPlans('${hotel.hotel_id}');">Save to My Plans</button>
        <a href="${hotel.url}" target="_blank" class="booking-btn">Book on Booking.com</a>
      </div>`;
    searchResultsSection.appendChild(hotelElement);
  });

  updatePaginationButtons(); // Update pagination buttons based on the total number of pages and the current page
} 


// Function to change to a specific page number
function goToPage(pageNumber) {
  console.log(`Going to page: ${pageNumber}`);
  currentPage = pageNumber;
  displayPage();
}

// Function to update the pagination buttons display
function updatePaginationButtons() {
  const totalPages = getTotalPages(); // Calculate total pages using the function
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';

  // Create Prev button if not on the first page
  if (currentPage > 1) {
      const prevButton = document.createElement('button');
      prevButton.innerText = 'Prev';
      prevButton.onclick = () => goToPage(currentPage - 1);
      paginationContainer.appendChild(prevButton);
  }

  // Create page buttons
  for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.className = currentPage === i ? 'active' : '';
      pageButton.onclick = () => goToPage(i);
      paginationContainer.appendChild(pageButton);
  }

  // Create Next button if not on the last page
  if (currentPage < totalPages) {
      const nextButton = document.createElement('button');
      nextButton.innerText = 'Next';
      nextButton.onclick = () => goToPage(currentPage + 1);
      paginationContainer.appendChild(nextButton);
  }
}






// Reference to the search form
const searchForm = document.getElementById('search-form');

// Reference to the container of popular destinations
const popularDestinationsSection = document.getElementsByClassName('destinations-container')[0];

// Reference to the container where search results will be displayed
const searchResultsSection = document.getElementById('search-results');


// Function to hide popular destinations and show search results container
function displaySearchResults() {
  console.log("Displaying search results...");

  // Hide the <h2> tag for popular destinations
  const popularDestinationsTitle = document.getElementById('popular-destinations-title');
  if (popularDestinationsTitle) {
    popularDestinationsTitle.style.display = 'none';
  }

  // Hide the container of popular destinations
  popularDestinationsSection.style.display = 'none';
  
  // Show the search results container
  searchResultsSection.style.display = 'flex';
  searchResultsSection.style.flexDirection = 'column';
  searchResultsSection.style.alignItems = 'center';
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

// Function to calculate the number of nights between two dates
function calculateNights(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.round((checkOut - checkIn) / millisecondsPerDay);
}  

  

// Function to search hotels based on the destination ID
async function searchHotels(destId) {
    // Formato de fechas y otros datos necesarios para la búsqueda, ajusta según tu formulario
    const checkInDate = document.getElementById('start-date').value;
    const checkOutDate = document.getElementById('end-date').value;
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
      
      allResults = hotels.result || [];
      displaySearchResults();
      initPaginationAndDisplay(); // Prepare pagination and display the first page
      // Clear previous search results
      // searchResultsSection.innerHTML = '';
  
    //   if (hotels && hotels.result) {
    //     const nights = calculateNights(checkInDate, checkOutDate);
    //       hotels.result.forEach(hotel => {
    //         const nightText = nights === 1 ? 'night' : 'nights'; // Handles singular or plural nights
    //         const hotelElement = document.createElement('div');
    //         hotelElement.className = 'card'; 
    //         hotelElement.innerHTML = `
    //           <div class="card-images">   
    //             <img class="card-image" src="${hotel.max_photo_url || 'default-image.jpg'}" alt="${hotel.hotel_name}">
    //           <div class="card-info">
    //             <h3 class="hotel-name">${hotel.hotel_name || 'Name not available'}</h3>
    //             <p class="hotel-score">${hotel.review_score_word || 'Score not available'} ${hotel.review_score || ''}</p>
    //             <p class="hotel-address">${hotel.distance_to_cc_formatted || 'Address not available'} from city center</p>
    //             <p class="hotel-nights">${nights} ${nightText}</p>
    //             <p class="hotel-price">${hotel.price_breakdown.all_inclusive_price || 'Price not available'} ${hotel.price_breakdown.currency || ''}</p>
    //             <button onclick="saveToMyPlans('${hotel.hotel_id}');">Save to My Plans</button>
    //             <a href="${hotel.url}" target="_blank"><button>Book on Booking.com</button></a>
    //         `; 

            
    //         searchResultsSection.appendChild(hotelElement);
    //     });
    // } else {
    //     searchResultsSection.innerHTML = '<p>No hotels found</p>';
    // }

  
    } catch (error) {
      console.error("Error fetching hotels:", error);
      searchResultsSection.innerHTML = `<p>Error fetching hotels: ${error.message}</p>`;

      
    }
  }
  function initPaginationAndDisplay(hotels) {
    console.log("Initializing pagination and displaying results...");
    console.log(`Total results fetched: ${allResults.length}`);
    currentPage = 1; // Reset to the first page
    displayPage(); // Display the first page of results
    updatePaginationButtons(); // Create pagination buttons
  }
  

  