document.addEventListener('DOMContentLoaded', () => {
    // --- Page Elements ---
    // Get references to all the main page containers in the HTML.
    const welcomePage = document.getElementById('welcomePage');
    const loginPage = document.getElementById('loginPage');
    const homePage = document.getElementById('homePage');
    const dashboardPage = document.getElementById('dashboardPage');
    const emergencySafetyPage = document.getElementById('emergencySafetyPage');
    const controlPanelPage = document.getElementById('controlPanelPage');
    const myVehiclePage = document.getElementById('myVehiclePage');
    const vehicleLocationPage = document.getElementById('vehicleLocationPage');
    const vehicleTripsPage = document.getElementById('vehicleTripsPage');
    const profilePage = document.getElementById('profilePage');
    const accountSettingsPage = document.getElementById('accountSettingsPage');
    const contactUsPage = document.getElementById('contactUsPage');


    // --- Welcome Page Elements ---
    // Get references to the checkbox and the "Get Started" button on the welcome page.
    const termsCheckbox = document.getElementById('termsCheckbox');
    const getStartedBtn = document.getElementById('getStartedBtn');

    // --- Login Page Elements ---
    // Get references to various input fields, buttons, and message display areas on the login/signup page.
    const loginTitle = document.getElementById('loginTitle');
    const emailMobileInput = document.getElementById('emailMobileInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const authActionBtn = document.getElementById('authActionBtn');
    const mobileOtpBtn = document.getElementById('mobileOtpBtn');
    const emailOtpBtn = document.getElementById('emailOtpBtn');
    const otpSection = document.getElementById('otpSection');
    const otpInput = document.getElementById('otpInput');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const loginMessageBox = document.getElementById('loginMessageBox');
    const toggleAuthModeBtn = document.getElementById('toggleAuthModeBtn');

    let isSignUpMode = false; // Flag to track if the user is in signup mode (true) or login mode (false).
    let currentOtpTarget = ''; // Stores whether OTP was sent to 'mobile' or 'email' for verification.

    // --- Home Page Elements ---
    // Get references to the navigation buttons on the home/library page.
    const dashboardBtn = document.getElementById('dashboardBtn');
    const emergencySafetyBtn = document.getElementById('emergencySafetyBtn');
    const controlPanelBtn = document.getElementById('controlPanelBtn');
    const myVehicleBtn = document.getElementById('myVehicleBtn');
    const vehicleLocationBtn = document.getElementById('vehicleLocationBtn');
    const vehicleTripsBtn = document.getElementById('vehicleTripsBtn');
    const profileBtn = document.getElementById('profileBtn');
    const accountSettingsBtn = document.getElementById('accountSettingsBtn');
    const contactUsBtn = document.getElementById('contactUsBtn');

    // --- Dashboard Page Elements ---
    // Get references to elements displaying dynamic data on the dashboard.
    const batteryPercentage = document.getElementById('batteryPercentage');
    const currentSpeed = document.getElementById('currentSpeed');
    const currentRange = document.getElementById('currentRange');

    // --- Back Buttons ---
    // Get references to all "Back" buttons used for navigation from sub-pages back to the home page.
    const backToHomeBtn1 = document.getElementById('backToHomeBtn1'); // From Dashboard
    const backToHomeBtn2 = document.getElementById('backToHomeBtn2'); // From Emergency Safety
    const backToHomeBtn3 = document.getElementById('backToHomeBtn3'); // From Control Panel
    const backToHomeBtn4 = document.getElementById('backToHomeBtn4'); // From My Vehicle
    const backToHomeBtn5 = document.getElementById('backToHomeBtn5'); // From Vehicle Location
    const backToHomeBtn6 = document.getElementById('backToHomeBtn6'); // From Vehicle Trips
    const backToHomeBtn7 = document.getElementById('backToHomeBtn7'); // From Profile
    const backToHomeBtn8 = document.getElementById('backToHomeBtn8'); // From Account & Settings
    const backToHomeBtn9 = document.getElementById('backToHomeBtn9'); // From Contact Us


    // --- Utility Functions ---

    /**
     * Shows a specific page and hides all other pages.
     * It manages the 'active' class and z-index for smooth transitions.
     * @param {HTMLElement} pageToShow - The page element (e.g., welcomePage, loginPage) to make active.
     */
    function showPage(pageToShow) {
        // Select all elements that have the 'page' class.
        const allPages = document.querySelectorAll('.page');
        // Iterate over each page and remove the 'active' class and reset z-index.
        allPages.forEach(page => {
            page.classList.remove('active');
            page.style.zIndex = '1'; // Reset z-index to ensure only active page is on top.
        });
        // Add the 'active' class to the page that needs to be shown.
        pageToShow.classList.add('active');
        // Bring the active page to the front by setting a higher z-index.
        pageToShow.style.zIndex = '10';
    }

    /**
     * Displays a message within the designated message box on the login page.
     * It applies appropriate styling based on the message type (success, error, info).
     * @param {string} message - The text content of the message to display.
     * @param {'success'|'error'|'info'} type - The type of message, used to apply specific CSS classes for styling.
     */
    function displayMessage(message, type) {
        loginMessageBox.textContent = message; // Set the message text.
        // Reset existing classes and apply new ones based on the message type.
        loginMessageBox.className = `message-box w-full mt-4 ${type}`;
        loginMessageBox.classList.remove('hidden'); // Ensure the message box is visible.
    }

    /**
     * Hides the message box on the login page and clears its content.
     */
    function hideMessage() {
        loginMessageBox.classList.add('hidden'); // Add the 'hidden' class to hide the message box.
        loginMessageBox.textContent = ''; // Clear any previous message text.
    }

    /**
     * Toggles the visibility of an HTML element by adding/removing 'hidden-field' and 'visible-field' classes.
     * This is used for elements like the 'Confirm Password' input.
     * @param {HTMLElement} element - The HTML element whose visibility is to be toggled.
     * @param {boolean} show - If true, the element will be made visible; if false, it will be hidden.
     */
    function toggleFieldVisibility(element, show) {
        if (show) {
            element.classList.remove('hidden-field'); // Remove hidden class.
            element.classList.add('visible-field');   // Add visible class.
        } else {
            element.classList.remove('visible-field'); // Remove visible class.
            element.classList.add('hidden-field');    // Add hidden class.
        }
    }


    // --- Event Listeners ---

    // Welcome Page Interactions
    // Event listener for the terms and conditions checkbox.
    // Enables/disables the "Get Started" button based on whether the checkbox is checked.
    termsCheckbox.addEventListener('change', () => {
        getStartedBtn.disabled = !termsCheckbox.checked;
    });

    // Event listener for the "Get Started" button.
    // If terms are accepted, it navigates to the login page.
    getStartedBtn.addEventListener('click', () => {
        if (termsCheckbox.checked) {
            showPage(loginPage); // Navigate to the login page.
            hideMessage(); // Clear any previous messages when moving to the login page.
        }
    });

    // Login/Signup Page Interactions
    // Event listener for the "New user? Sign Up" / "Already have an account? Login" toggle button.
    // Switches between login and signup modes, updating UI elements accordingly.
    toggleAuthModeBtn.addEventListener('click', () => {
        isSignUpMode = !isSignUpMode; // Toggle the mode.
        if (isSignUpMode) {
            loginTitle.textContent = 'Sign Up';
            authActionBtn.textContent = 'Sign Up';
            toggleAuthModeBtn.textContent = 'Already have an account? Login';
            toggleFieldVisibility(confirmPasswordInput, true); // Show confirm password field for signup.
            hideMessage(); // Clear any messages.
        } else {
            loginTitle.textContent = 'Login';
            authActionBtn.textContent = 'Login';
            toggleAuthModeBtn.textContent = 'New user? Sign Up';
            toggleFieldVisibility(confirmPasswordInput, false); // Hide confirm password field for login.
            hideMessage(); // Clear any messages.
        }
        // Clear input fields when switching modes to prevent stale data.
        emailMobileInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        otpInput.value = '';
        otpSection.classList.remove('active'); // Hide OTP section if it was active.
    });

    // Event listener for the main authentication action button (Login/Sign Up).
    // Handles form validation and simulates authentication.
    authActionBtn.addEventListener('click', () => {
        hideMessage(); // Clear any existing messages.
        const emailOrMobile = emailMobileInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Basic validation: Check if email/mobile and password fields are filled.
        if (!emailOrMobile || !password) {
            displayMessage('Please fill in all fields.', 'error');
            return;
        }

        if (isSignUpMode) {
            // Logic for Sign Up mode.
            if (password !== confirmPassword) {
                displayMessage('Passwords do not match.', 'error');
                return;
            }
            // Simulate a successful signup. In a real app, this would be an API call.
            console.log('Simulating Sign Up:', { emailOrMobile, password });
            displayMessage('Sign Up successful! Please login.', 'success');
            // You might want to automatically switch to login mode here or keep the user on signup.
        } else {
            // Logic for Login mode.
            // Simulate a successful login. In a real app, this would be an API call.
            console.log('Simulating Logging In:', { emailOrMobile, password });
            displayMessage('Login successful! Redirecting to Home...', 'success');
            // After a short delay, navigate to the home page.
            setTimeout(() => {
                showPage(homePage); // Navigate to the home page.
                hideMessage(); // Clear the message.
            }, 1500);
        }
    });

    // Event listener for the "Mobile OTP" button.
    // Simulates sending an OTP to a mobile number.
    mobileOtpBtn.addEventListener('click', () => {
        hideMessage(); // Clear any existing messages.
        const mobile = emailMobileInput.value.trim();
        // Basic mobile number validation (10 digits).
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            displayMessage('Please enter a valid 10-digit mobile number.', 'error');
            return;
        }
        currentOtpTarget = 'mobile'; // Set OTP target.
        otpSection.classList.add('active'); // Show the OTP input section.
        displayMessage(`OTP sent to ${mobile}.`, 'info');
        console.log(`Simulating OTP send to mobile: ${mobile}`);
    });

    // Event listener for the "Email OTP" button.
    // Simulates sending an OTP to an email address.
    emailOtpBtn.addEventListener('click', () => {
        hideMessage(); // Clear any existing messages.
        const email = emailMobileInput.value.trim();
        // Basic email validation.
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            displayMessage('Please enter a valid email address.', 'error');
            return;
        }
        currentOtpTarget = 'email'; // Set OTP target.
        otpSection.classList.add('active'); // Show the OTP input section.
        displayMessage(`OTP sent to ${email}.`, 'info');
        console.log(`Simulating OTP send to email: ${email}`);
    });

    // Event listener for the "Verify OTP" button.
    // Simulates OTP verification.
    verifyOtpBtn.addEventListener('click', () => {
        hideMessage(); // Clear any existing messages.
        const otp = otpInput.value.trim();
        // Basic OTP validation (assuming a 6-digit OTP).
        if (!otp || otp.length !== 6) {
            displayMessage('Please enter a valid 6-digit OTP.', 'error');
            return;
        }
        // Simulate OTP verification. In a real app, this would be an API call.
        console.log(`Verifying OTP for ${currentOtpTarget}: ${otp}`);
        if (otp === '123456') { // Hardcoded OTP for demonstration purposes.
            displayMessage('OTP Verified! Redirecting to Home...', 'success');
            // After a short delay, navigate to the home page.
            setTimeout(() => {
                showPage(homePage); // Navigate to the home page.
                hideMessage(); // Clear the message.
                otpSection.classList.remove('active'); // Hide the OTP section.
                otpInput.value = ''; // Clear the OTP input field.
            }, 1500);
        } else {
            displayMessage('Invalid OTP. Please try again.', 'error');
        }
    });


    // Home Page Navigation
    // Event listeners for each button on the home/library page to navigate to respective sections.
    dashboardBtn.addEventListener('click', () => showPage(dashboardPage));
    emergencySafetyBtn.addEventListener('click', () => showPage(emergencySafetyPage));
    controlPanelBtn.addEventListener('click', () => showPage(controlPanelPage));
    myVehicleBtn.addEventListener('click', () => showPage(myVehiclePage));
    vehicleLocationBtn.addEventListener('click', () => showPage(vehicleLocationPage));
    vehicleTripsBtn.addEventListener('click', () => showPage(vehicleTripsPage));
    profileBtn.addEventListener('click', () => showPage(profilePage));
    accountSettingsBtn.addEventListener('click', () => showPage(accountSettingsPage));
    contactUsBtn.addEventListener('click', () => showPage(contactUsPage));


    // Back Button Functionality
    // Event listeners for all "Back" buttons to return to the home page.
    backToHomeBtn1.addEventListener('click', () => showPage(homePage));
    backToHomeBtn2.addEventListener('click', () => showPage(homePage));
    backToHomeBtn3.addEventListener('click', () => showPage(homePage));
    backToHomeBtn4.addEventListener('click', () => showPage(homePage));
    backToHomeBtn5.addEventListener('click', () => showPage(homePage));
    backToHomeBtn6.addEventListener('click', () => showPage(homePage));
    backToHomeBtn7.addEventListener('click', () => showPage(homePage));
    backToHomeBtn8.addEventListener('click', () => showPage(homePage));
    backToHomeBtn9.addEventListener('click', () => showPage(homePage));


    // --- Dynamic Content Updates (Dashboard Example) ---
    /**
     * Updates the dashboard with simulated dynamic data for battery, speed, and range.
     * In a real application, this data would be fetched from an actual EV API or sensor.
     */
    function updateDashboardData() {
        // Generate random battery percentage between 60% and 100%.
        const randomBattery = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
        // Generate random speed between 0 km/h and 120 km/h.
        const randomSpeed = Math.floor(Math.random() * (120 - 0 + 1)) + 0;
        // Estimate range based on battery percentage (simple calculation).
        const randomRange = Math.floor(randomBattery * 2.5);

        // Update the text content of the respective dashboard elements.
        batteryPercentage.textContent = randomBattery;
        currentSpeed.textContent = randomSpeed;
        currentRange.textContent = randomRange;
    }

    // Call the function once when the DOM content is fully loaded to set initial dashboard values.
    // In a more advanced app, you might call this periodically using setInterval or when the dashboard page becomes active.
    updateDashboardData();
});
