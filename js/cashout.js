/*-------------------------Content Transformation-------------------------*/
window.addEventListener("DOMContentLoaded", function () {
  const title = localStorage.getItem("Title") || "N/A";
  const price = localStorage.getItem("Price") || "N/A";
  const style = localStorage.getItem("Style") || "N/A";
  const NFC = localStorage.getItem("NFC") || "N/A";

  const titleElement = document.getElementById("Title");
  const priceElement = document.getElementById("price");
  const styleElement = document.getElementById("Style");
  const NFCElement = document.getElementById("NFC");

  if (titleElement) titleElement.textContent = title;
  if (priceElement) priceElement.textContent = price;
  if (styleElement) styleElement.textContent = style;
  if (NFCElement) NFCElement.textContent = NFC;
});

  
  /*-------------------------Registration System-------------------------*/
  document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const ERROR_DISPLAY_TIME = 3000;
    const PASSWORD_MIN_LENGTH = 8;

    // Secure ID generation
    const generateSecureId = (length, chars) => {
        const buffer = new Uint32Array(length);
        window.crypto.getRandomValues(buffer);
        return Array.from(buffer, (num) => chars[num % chars.length]).join('');
    };

    // DOM Elements
    const elements = {
        signUpBtn: document.querySelector('.signUp-btn'),
        signupForm: document.getElementById('signupForm'),
        errorMessage: document.getElementById('error-message'),
        toggleButtons: document.querySelectorAll('.toggle-password')
    };

    // Validation functions
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        password.length >= PASSWORD_MIN_LENGTH &&
        /[A-Z]/.test(password) &&
        /\d/.test(password);

    // Error display
    const showError = (message, element = null) => {
        if (elements.errorMessage) {
            elements.errorMessage.textContent = message;
            elements.errorMessage.style.display = 'block';
            if (element) element.focus();

            setTimeout(() => {
                elements.errorMessage.style.display = 'none';
            }, ERROR_DISPLAY_TIME);
        }
    };

    // Toggle password visibility
    const handlePasswordToggle = (button) => {
        const input = document.getElementById(button.dataset.target);
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        button.textContent = isPassword ? 'Hide' : 'Show';
        button.setAttribute('aria-label', `${isPassword ? 'Hide' : 'Show'} password`);
    };

    // Set loading state for button
    const setLoadingState = (isLoading) => {
        if (!elements.signUpBtn) return;
        if (isLoading) {
            elements.signUpBtn.disabled = true;
            elements.signUpBtn.innerHTML = `<span class="loader"></span> Signing up...`;
        } else {
            elements.signUpBtn.disabled = false;
            elements.signUpBtn.textContent = 'Sign Up';
        }
    };

    // Signup handler
    const handleSignup = async (event) => {
        event.preventDefault();

        const getValue = (id) => document.getElementById(id)?.value.trim();
        const [name, email, password, confirmPassword] = ['name', 'email', 'password', 'confirm-password'].map(getValue);

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return showError('Please fill all required fields');
        }
        if (!validateEmail(email)) {
            return showError('Please enter a valid email address', document.getElementById('email'));
        }
        if (password !== confirmPassword) {
            return showError('Passwords do not match', document.getElementById('confirm-password'));
        }
        if (!validatePassword(password)) {
            return showError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters with an uppercase letter and a number`, document.getElementById('password'));
        }

        try {
            setLoadingState(true);

            // Generate IDs
            const ids = {
                orderId: generateSecureId(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
                userId: generateSecureId(18, 'abcdefghijklmnopqrstuvwxyz0123456789')
            };

            // Populate hidden fields
            Object.entries({
                OrderId: ids.orderId,
                Id: ids.userId,
                acName: name,
                acEmail: email,
                Pass: password
            }).forEach(([id, value]) => {
                const field = document.getElementById(id);
                if (field) field.value = value;
            });

            // Simulated delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show next section
            document.querySelector('.signUp').style.display = 'none';
            document.querySelector('.cashOut-section').style.display = 'block';

        } catch (error) {
            showError('Registration failed. Please try again.');
        } finally {
            setLoadingState(false);
        }
    };

    // Event listeners
    if (elements.signUpBtn) elements.signUpBtn.addEventListener('click', handleSignup);
    if (elements.signupForm) elements.signupForm.addEventListener('submit', handleSignup);
    elements.toggleButtons.forEach(button =>
        button.addEventListener('click', () => handlePasswordToggle(button))
    );
});

//   document.addEventListener('DOMContentLoaded', () => {
//     // Constants and reusable elements
//     const ERROR_DISPLAY_TIME = 3000; // Display error messages for 3 seconds
//     const PASSWORD_MIN_LENGTH = 8;
    
//     // Secure ID generation using crypto API
//     const generateSecureId = (length, chars) => {
//         const buffer = new Uint32Array(length);
//         window.crypto.getRandomValues(buffer);
//         return Array.from(buffer, (num) => chars[num % chars.length]).join('');
//     };

//     // DOM Elements
//     const elements = {
//         signUpBtn: document.querySelector('.signUp-btn'),
//         signupForm: document.getElementById('signupForm'),
//         errorMessage: document.getElementById('error-message'),
//         loadingAnimation: document.querySelector('.loading-animation-box'),
//         loadActionBtn: document.querySelector('.load-action-btn'),
//         toggleButtons: document.querySelectorAll('.toggle-password')
//     };

//     // Validation functions
//     const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     const validatePassword = (password) =>
//         password.length >= PASSWORD_MIN_LENGTH && /[A-Z]/.test(password) && /\d/.test(password);

//     // Error handling
//     const showError = (message, element = null) => {
//         if (elements.errorMessage) {
//             elements.errorMessage.textContent = message;
//             elements.errorMessage.style.display = 'block';
//             if (element) element.focus();

//             setTimeout(() => {
//                 elements.errorMessage.style.display = 'none';
//             }, ERROR_DISPLAY_TIME);
//         }
//     };

//     // Loading state management
//     const setLoadingState = (isLoading) => {
//         if (elements.loadingAnimation) {
//             elements.loadingAnimation.style.display = isLoading ? 'block' : 'none';
//         }
//         if (elements.loadActionBtn) {
//             elements.loadActionBtn.disabled = isLoading;
//             elements.loadActionBtn.style.display = isLoading ? 'none' : 'block';
//         }
//     };

//     // Password visibility toggle
//     const handlePasswordToggle = (button) => {
//         const input = document.getElementById(button.dataset.target);
//         if (!input) return;
//         const isPassword = input.type === 'password';
//         input.type = isPassword ? 'text' : 'password';
//         button.textContent = isPassword ? 'Hide' : 'Show';
//         button.setAttribute('aria-label', `${isPassword ? 'Hide' : 'Show'} password`);
//     };

//     // Main signup handler
//     const handleSignup = async (event) => {
//         event.preventDefault();
        
//         const getValue = (id) => document.getElementById(id)?.value.trim();
//         const [name, email, password, confirmPassword] = ['name', 'email', 'password', 'confirm-password'].map(getValue);

//         // Validation checks
//         if (!name || !email || !password || !confirmPassword) {
//             return showError('Please fill all required fields');
//         }
//         if (!validateEmail(email)) {
//             return showError('Please enter a valid email address', document.getElementById('email'));
//         }
//         if (password !== confirmPassword) {
//             return showError('Passwords do not match', document.getElementById('confirm-password'));
//         }
//         if (!validatePassword(password)) {
//             return showError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters with an uppercase letter and a number`, document.getElementById('password'));
//         }

//         try {
//             setLoadingState(true);
//             const ids = {
//                 orderId: generateSecureId(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
//                 userId: generateSecureId(18, 'abcdefghijklmnopqrstuvwxyz0123456789')
//             };
            
//             Object.entries({ OrderId: ids.orderId, Id: ids.userId, acName: name, acEmail: email, Pass: password })
//                 .forEach(([id, value]) => {
//                     const field = document.getElementById(id);
//                     if (field) field.value = value;
//                 });
            
//             await new Promise(resolve => setTimeout(resolve, 2000));
            
//             document.querySelector('.signUp').style.display = 'none';
//             document.querySelector('.cashOut-section').style.display = 'block';
//         } catch (error) {
//             showError('Registration failed. Please try again.');
//         } finally {
//             setLoadingState(false);
//         }
//     };

//     // Event listeners
//     if (elements.signUpBtn) elements.signUpBtn.addEventListener('click', handleSignup);
//     elements.toggleButtons.forEach(button => button.addEventListener('click', () => handlePasswordToggle(button)));
//     if (elements.signupForm) elements.signupForm.addEventListener('submit', handleSignup);
// });
  
  /*-------------------------District to Serial Thana-------------------------*/
  document.getElementById('District').addEventListener('change', function () {
    const district = this.value.toLowerCase().replace(/\s+/g, '-');
    const policeStationOptions = document.querySelectorAll('#Thana option');
  
    policeStationOptions.forEach(option => option.style.display = 'none');
    document.querySelectorAll(`.thana-option.${district}-thana`).forEach(option => option.style.display = 'block');
  });
    /*-------------------------payment method-------------------------*/
  document.addEventListener('DOMContentLoaded', () => {
    const shippingDisplay = document.getElementById('Shipping');

    // Function to update shipping fee based on selected radio
    function updateShippingCost() {
      const selected = document.querySelector('input[name="shippingMethod"]:checked');
      if (selected) {
        const amount = selected.getAttribute('data-amount');
        shippingDisplay.value = amount;
      }
    }

    // Set initial shipping fee on page load
    updateShippingCost();

    // Update shipping fee when user selects a different shipping method
    document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
      radio.addEventListener('change', updateShippingCost);
    });
  });
    /*-------------------------Sum All Price-------------------------*/
    window.addEventListener('DOMContentLoaded', () => {
      const priceElement = document.getElementById('price');
      const subtotalElement = document.getElementById('subtotal');
      const shippingElement = document.getElementById('Shipping');
      const totalElement = document.getElementById('Total');
      const payThisPaymentElement = document.querySelector('.pay-this-payment');

      // Function to calculate and update totals
      function updateTotals() {
        const priceValue = parseFloat(priceElement.value.replace(/[^\d.-]/g, '')) || 0;
        const shippingValue = parseFloat(shippingElement.value.replace(/[^\d.-]/g, '')) || 0;
        const totalValue = priceValue + shippingValue;

        subtotalElement.value = `${priceValue.toFixed(2)}`;
        totalElement.value = `${totalValue.toFixed(2)}`;
        payThisPaymentElement.textContent = `Scan the QR code and pay ৳ ${totalValue.toFixed(2)}`;
      }

      // Update totals when the price input changes (if user types in it)
      priceElement.addEventListener('input', updateTotals);

      // Update totals when the shipping input is manually changed
      shippingElement.addEventListener('input', updateTotals);

      // Polling in case the shipping value is updated programmatically without triggering an event
      let lastShippingValue = shippingElement.value;
      setInterval(() => {
        if (shippingElement.value !== lastShippingValue) {
          lastShippingValue = shippingElement.value;
          updateTotals();
        }
      }, 300);

      // Initial calculation on page load
      updateTotals();
    });
  /*-------------------------Payment Selection System-------------------------*/
  document.addEventListener('DOMContentLoaded', () => {
    const fullPayBtn = document.querySelector('.full-pay-btn');
    const codPayBtn = document.querySelector('.cod-pay-btn');
    const fullPayQr = fullPayBtn.nextElementSibling;
    const codPayQr = codPayBtn.nextElementSibling;
  
    // Initialize active state
    fullPayBtn.classList.add('active');
    fullPayQr.classList.add('active');
  
    fullPayBtn.addEventListener('click', () => {
      if (!fullPayBtn.classList.contains('active')) {
        codPayBtn.classList.remove('active');
        codPayQr.classList.remove('active');
        fullPayBtn.classList.add('active');
        fullPayQr.classList.add('active');
      }
    });
  
    codPayBtn.addEventListener('click', () => {
      if (!codPayBtn.classList.contains('active')) {
        fullPayBtn.classList.remove('active');
        fullPayQr.classList.remove('active');
        codPayBtn.classList.add('active');
        codPayQr.classList.add('active');
      }
    });
  });
  /*-------------------------Database Submission-------------------------*/
// === cashOut.js (fixed) ===
const scriptURL = 'https://script.google.com/macros/s/AKfycbzLrVAJo56dSnuBBSyb_p3DcniOwLfVMGv-YPDHe78NeqHLITOo3_tPcvgNDQSwJy0JWQ/exec';
const scriptURLOne = 'https://script.google.com/macros/s/AKfycbwM4HwOOpy7vAIMgRRJ_zYOkD0BuHr5eS4avSmO3omELVh58yHT9_qaNojLNS68FcqS_Q/exec';
const scriptURLTwo = 'https://script.google.com/macros/s/AKfycbw6Zbx9Fr-3JLG5L-t9WLc33Q9ZmmPu0-u58wPCbYHx9IMdqdZtf09CdUdhGIuJJ-DnAQ/exec';
const dashboardGraph = 'https://script.google.com/macros/s/AKfycbxnMJ9qkm_lWBoYIbjbM7WP-T4WJpiLoFiI7oOrHO0-QebY-wiagPjxAfbxMN86JNCHnw/exec';
const VLDID = 'https://script.google.com/macros/s/AKfycbwkChVJnLPs401FFnVYL7VISSf8VYsJqx5UvBifd0pABsYRLxCXFbG1iLKL_Gg-YN9zqA/exec'; // Replace with your correct URL

const form = document.forms['submit-to-google-sheet'];
const orderBtn = document.querySelector('.com-order-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  orderBtn.disabled = true;
  const originalText = orderBtn.textContent;
  orderBtn.textContent = 'Loading...';

  // Create one FormData object, then clone it for each fetch
  const formData = new FormData(form);
  const clones = [
    new FormData(form),
    new FormData(form),
    new FormData(form),
    new FormData(form)
  ];

  const urls = [scriptURL, scriptURLOne, scriptURLTwo, dashboardGraph];
  const requests = urls.map((url, i) =>
    fetch(url, { method: 'POST', body: clones[i] })
  );

  Promise.all(requests)
    .then(async (responses) => {
      const jsons = await Promise.all(responses.map((res) =>
        res.ok ? res.json() : Promise.resolve(null)
      ));

      const [json1, json2, json3, json4] = jsons;

      if (!json1 || !json2 || !json3 || !json4) {
        throw new Error('One or more submissions failed');
      }

      form.reset();
      window.location.href = '../design/';
    })
    .catch((error) => {
      console.error('Submission error:', error);
      orderBtn.disabled = false;
      orderBtn.textContent = originalText;
    });
});


/*-----------------------------------------orders date-----------------------------------------*/
function updateDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  document.getElementById('currentDate').value = formattedDate;
}

// Initial update when page loads
updateDate();

// Update every minute to handle date changes
setInterval(updateDate, 60000);

// Optional: Update when visibility changes (if browser tab regains focus)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) updateDate();
});