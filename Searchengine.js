// Function to modify the quantity of passengers
function modifyQuantity(passengerType, delta) {
    const input = document.getElementById(passengerType);
    let currentValue = parseInt(input.value, 10);
    currentValue += delta;

    if (currentValue < parseInt(input.min, 10)) {
        currentValue = parseInt(input.min, 10);
    }

    input.value = currentValue;
}

// Event listeners for the passenger buttons
document.addEventListener('DOMContentLoaded', function() {
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            modifyQuantity(type, -1);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            modifyQuantity(type, 1);
        });
    });
});
