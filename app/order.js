// Function to open the order form modal
function openOrderForm() {
  document.getElementById("orderModal").style.display = "block";

  showStep(1); // Start from the first step
}
$(document).ready( function() {                    // this code runs when the page is first loaded
  showStep(1);
});
// Function to close the modal
function closeOrderForm() {
  document.getElementById("orderModal").style.display = "none";
  document.getElementById("paymentSection").style.display = "none";
  document.getElementById("thankYouPage").style.display = "none";
  resetSelections(); // Hide the Thank You page
}

// Show a specific step
function showStep(step) {
  let steps = document.querySelectorAll(".menu-section");
  steps.forEach((section) => (section.style.display = "none"));

  if (step === "thankYouPage") {
    document.getElementById("thankYouPage").style.display = "block"; // Show Thank You page
  } else {
    const stepElement = document.getElementById(`step${step}`);
    if (stepElement) {
      stepElement.style.display = "block"; // Show the appropriate step
    }
  }
}

// Next step navigation
function nextStep(step) {
  showStep(step);
  console.log(step);
}

// Update the quantity for a specific item
function updateQuantity(itemId, change) {
  const itemInput = document.getElementById(itemId);
  let currentQuantity = parseInt(itemInput.value);
  currentQuantity += change;
  if (currentQuantity < 0) currentQuantity = 0;
  itemInput.value = currentQuantity;
}

// Show order summary before checkout
function showSummary() {
  let selectedItems = [];
  let totalPrice = 0;

  // Collect selected items and their quantities
  [
    "Mediterranean-Mezze-Platter",
    "Tomato-Burrata",
    "Roasted-Beet-Carpaccio",
    "Hot-Honey-Pizza",
    "Margherita-Pizza",
    "Wild-Mushroom-Truffle-Pizza",
    "Mediterranean-Delight-Pizza",
    "Eggplant-Parmesan",
    "Stuffed-Bell-Peppers",
    "Mediterranean-Veggie-Bowl",
    "Falafel-Platter",
    "Pesto-alla-Genovese",
    "Eggplant-Lasagna",
    "Lumache-alla-Vodka",
    "Cacio-e-Pepe",
    "Rigatoni-alla-Norma",
    "Campanelle-al-Tartufo",
  ].forEach((itemId) => {
    const quantity = parseInt(document.getElementById(itemId).value);
    if (quantity > 0) {
      const price = parseFloat(
        document.querySelector(`label[for=${itemId}]`).dataset.price
      );
      selectedItems.push(
        `${itemId} x${quantity} - $${(price * quantity).toFixed(2)}`
      );
      totalPrice += price * quantity;
    }
  });

  if (selectedItems.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  let orderSummaryHtml = `<ul>`;
  selectedItems.forEach((item) => {
    orderSummaryHtml += `<li>${item}</li>`;
  });
  orderSummaryHtml += `</ul>`;

  document.getElementById("orderSummary").innerHTML = orderSummaryHtml;
  document.getElementById("totalPrice").innerText = `$${totalPrice.toFixed(2)}`;
  document.getElementById("pickupTime").innerText = calculatePickupTime();
  document.getElementById("summary").innerHTML = orderSummaryHtml + '<br>Total Price: ' + "$" + totalPrice.toFixed(2) + '<br>' + 
    "Pickup Time: " + calculatePickupTime();


  showStep(5); // Go to the final checkout step
}

// Show checkout (payment options)

// function showCheckout() {
//     const paymentSection = document.getElementById('paymentSection');

//     paymentSection.classList.add('show');

//     showStep(6);
// }
function showCheckout() {
  const paymentSection = document.getElementById("paymentSection");

  // Make sure the payment section becomes visible directly after order summary
  paymentSection.style.display = "block";
  document.getElementById("tab-selection").style.display = "none";
  // You no longer need to call showStep(6)
  document.getElementById("step5").style.display = "none"; // Hide the order summary section if needed
}



// Calculate the pickup time (e.g., 30 minutes from now)
function calculatePickupTime() {
  let now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Reset selections after closing the modal
function resetSelections() {
  // Reset the product quantities
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.value = 0;
  });

  // Reset order summary
  document.getElementById("orderSummary").innerHTML = "";
  document.getElementById("totalPrice").innerText = "$0.00";
  document.getElementById("pickupTime").innerText = "";

  // Reset the payment section
  const creditCardCheckbox = document.getElementById("credit-card-checkbox");
  const payInStoreCheckbox = document.getElementById("pay-in-store-checkbox");
  const creditCardInfo = document.getElementById("credit-card-info");

  // Uncheck payment options
  creditCardCheckbox.checked = false;
  payInStoreCheckbox.checked = false;

  // Hide credit card info section if unchecked
  creditCardInfo.style.display = "none";

  // Reset credit card input fields
  document.getElementById("card-number").value = "";
  document.getElementById("exp-date").value = "";
  document.getElementById("security-code").value = "";
  document.getElementById("name-on-card").value = "";
  document.getElementById("address").value = "";
  document.getElementById("zip-code").value = "";

  // Hide error message
  document.getElementById("error-message").style.display = "none";
}

// Confirm Order
function confirmOrder() {
  alert("Order Confirmed!");
  closeOrderForm();
}

// Get the credit card checkbox, pay-in-store checkbox, and error message elements
const creditCardCheckbox = document.getElementById("credit-card-checkbox");
const payInStoreCheckbox = document.getElementById("pay-in-store-checkbox");
const creditCardInfo = document.getElementById("credit-card-info");
const errorMessage = document.getElementById("error-message");

// Function to toggle visibility of the credit card input fields
function toggleCreditCardInfo() {
  // If credit card is checked and Pay in Store is not, show credit card fields
  if (creditCardCheckbox.checked && !payInStoreCheckbox.checked) {
    creditCardInfo.style.display = "block"; // Show credit card info
  } else {
    creditCardInfo.style.display = "none"; // Hide credit card info if Pay in Store is selected or Credit Card is unchecked
  }
}

// Function to validate payment option before submitting
// Function to validate payment selection and navigate to "Thank You" page
// function validatePayment() {
//     if (!creditCardCheckbox.checked && !payInStoreCheckbox.checked) {
//         errorMessage.style.display = 'block';
//     } else {
//         errorMessage.style.display = 'none';
//         goToThankYouPage();
//     }
// }

function uncheckOtherCheckbox(checkbox) {
  const creditCardCheckbox = document.getElementById("credit-card-checkbox");
  const payInStoreCheckbox = document.getElementById("pay-in-store-checkbox");

  // If one checkbox is checked, uncheck the other
  if (checkbox === creditCardCheckbox && creditCardCheckbox.checked) {
    payInStoreCheckbox.checked = false; // Uncheck the Pay in Store checkbox
  } else if (checkbox === payInStoreCheckbox && payInStoreCheckbox.checked) {
    creditCardCheckbox.checked = false; // Uncheck the Credit Card checkbox
  }

  // Call the toggle function to show/hide credit card info
  toggleCreditCardInfo();
}
document
  .getElementById("credit-card-checkbox")
  .addEventListener("change", function () {
    uncheckOtherCheckbox(this); // Calls the function to uncheck the other checkbox
  });
document
  .getElementById("pay-in-store-checkbox")
  .addEventListener("change", function () {
    uncheckOtherCheckbox(this); // Calls the function to uncheck the other checkbox
  });

function validatePayment() {
  const creditCardCheckbox = document.getElementById("credit-card-checkbox");
  const payInStoreCheckbox = document.getElementById("pay-in-store-checkbox");
  const errorMessage = document.getElementById("error-message");
  const creditCardInfo = document.getElementById("credit-card-info");

  // If neither payment option is selected, show error
  if (!creditCardCheckbox.checked && !payInStoreCheckbox.checked) {
    errorMessage.style.display = "block";
    errorMessage.innerText =
      "Please select a payment option (either Credit Card or Pay in Store).";
    return;
  }

  // If Credit Card is selected, validate the credit card fields
  if (creditCardCheckbox.checked) {
    const cardNumber = document.getElementById("card-number").value.trim();
    const expDate = document.getElementById("exp-date").value.trim();
    const securityCode = document.getElementById("security-code").value.trim();
    const nameOnCard = document.getElementById("name-on-card").value.trim();
    const address = document.getElementById("address").value.trim();
    const zipCode = document.getElementById("zip-code").value.trim();

    let valid = true;
    let validationMessage = "";

    // Validate card number (16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
      valid = false;
      validationMessage += "Please enter a valid 16-digit card number.\n";
    }

    // Validate expiration date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expDate)) {
      valid = false;
      validationMessage += "Please enter a valid expiration date (MM/YY).\n";
    }

    // Validate security code (3 digits)
    if (!/^\d{3}$/.test(securityCode)) {
      valid = false;
      validationMessage += "Please enter a valid 3-digit security code.\n";
    }

    // Validate name on card
    if (nameOnCard === "") {
      valid = false;
      validationMessage += "Please enter the name on the card.\n";
    }

    // Validate address
    if (address === "") {
      valid = false;
      validationMessage += "Please enter your address.\n";
    }

    // Validate zip code
    // Validate zip code (must be numeric)
    if (!/^\d+$/.test(zipCode)) {
      valid = false;
      validationMessage += "Please enter a valid numeric zip code.\n";
    } else if (zipCode.length < 5 || zipCode.length > 10) {
      // Optional: Adjust the length check based on your region's zip code format
      valid = false;
      validationMessage += "Zip code must be between 5 to 10 digits.\n";
    }

    // If any field is invalid, show the error message and return
    if (!valid) {
      errorMessage.style.display = "block";
      errorMessage.innerText = validationMessage;
      return;
    }
    else {
      document.getElementById("payment-details").innerHTML = "Payment Method: <b>Credit Card</b><br>Card Number: "+cardNumber+"<br>Name on Card: "+nameOnCard;
    }
  }
  else {
    document.getElementById("payment-details").innerHTML = "Payment Method: <b>Pay In Store</b>";
  }
  // Hide the error message if everything is valid
  errorMessage.style.display = "none";

  // Proceed to the Thank You page if everything is valid
  goToThankYouPage();
}

// Function to navigate to the "Thank You" page (final step)
function goToThankYouPage() {
  document.getElementById("paymentSection").style.display = "none"; // Hide the payment section
  document.getElementById("payment-details").innerHTML = "Order Number: "+(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000) + "<br>" + document.getElementById("payment-details").innerHTML;
  showStep("thankYouPage"); // Navigate to the "Thank You" page
  document.getElementById("thankYouPage").style.display = "flex";
}

// Event listeners to trigger the toggle function when checkboxes are clicked
creditCardCheckbox.addEventListener("change", toggleCreditCardInfo);
payInStoreCheckbox.addEventListener("change", toggleCreditCardInfo);

// Initial check to set visibility based on default checkbox states (in case they're pre-selected)
toggleCreditCardInfo();

// Attach the validatePayment function to the "Place Order" button
document
  .getElementById("pay-now-button")
  .addEventListener("click", function () {
    validatePayment(); // Call validatePayment() when "Place Order" is clicked
  });
// This function will update the CO2 savings and the radial progress bar
function updateCO2Progress() {
  // Fixed value for simplicity (70% CO2 saved)
  let co2Saved = 2.5; // Example value for CO2 savings
  document.getElementById("co2Saved").innerText = co2Saved + " kg"; // Display in text

  // Calculate percentage (for example, let's keep it at 70%)
  let percentageSaved = 70;

  // Update the radial progress bar
  let progressClass = "progress-" + percentageSaved; // e.g., progress-70 for 70% savings

  // Apply the class to the progress element
  let progressElement = document.querySelector(".progress-radial");
  progressElement.className = "progress-radial " + progressClass; // Apply the class for 70% progress
}

// Initialize the progress bar on page load
window.onload = updateCO2Progress;

document.querySelectorAll('.qty-count').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.dataset.action;
        const input = this.closest('.qty-input').querySelector('.product-qty');
        let quantity = parseInt(input.value);
        const min = input.getAttribute('min');
        const max = input.getAttribute('max');

        // Increase quantity
        if (action === 'add' && quantity < max) {
            quantity++;
        }
        // Decrease quantity
        else if (action === 'minus' && quantity > min) {
            quantity--;
        }

        input.value = quantity;
    });
});

document.querySelectorAll('.radio-button').forEach(button => {
    button.addEventListener('click', function() {
        const elements = document.querySelectorAll('.radio-button'); // Select all elements with the class

        elements.forEach(element => {
          element.classList.remove('tab-active'); // Remove the class from each element
        });
        button.classList.add('tab-active');
    });
});