// Function to display all saved plans from local storage
function displayMyPlans() {
    const myPlans = JSON.parse(localStorage.getItem('myPlans')) || [];
    const plansContainer = document.getElementById('plans-container');
  
    // Clear previous contents
    plansContainer.innerHTML = '';
  
    // Check for saved plans and display, or show a message if none exist
    if (myPlans.length === 0) {
      plansContainer.innerHTML = '<p>No plans saved yet.</p>';
    } else {
      myPlans.forEach((plan, index) => {
        const planElement = document.createElement('div');
        planElement.classList.add('plan', 'card');
        
        planElement.innerHTML = `
          <h3>${plan.city} - ${plan.name}</h3>
          <p>Check-in: ${plan.checkInDate}</p>
          <p>Check-out: ${plan.checkOutDate}</p>
          <p>Price: ${plan.price} ${plan.currency}</p>
          <a href="${plan.link}" target="_blank" class="button">Book Now</a>
          <button class="button is-danger" onclick="removePlan(${index})">Remove</button>
        `;
        plansContainer.appendChild(planElement);
      });
    }
  }
  
  // Function to remove a saved plan
  function removePlan(index) {
    let myPlans = JSON.parse(localStorage.getItem('myPlans')) || [];
    if (index >= 0 && index < myPlans.length) {
      // Remove the plan at the given index
      myPlans.splice(index, 1);
      // Save the updated array back to local storage
      localStorage.setItem('myPlans', JSON.stringify(myPlans));
      // Update the displayed plans
      displayMyPlans();
    }
  }
  
  // Event listener for when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', function() {
    displayMyPlans(); // Call to display plans when page loads
  });
  