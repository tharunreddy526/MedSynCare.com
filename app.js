document.addEventListener("DOMContentLoaded", () => {
    const aadhaarInput = document.getElementById("aadhaar");
    const otpInput = document.getElementById("otp");
    const errorMsg = document.getElementById("error-msg");
    const otpErrorMsg = document.getElementById("otp-error-msg");
    const abhaNumberDisplay = document.getElementById("abhaNumber");

    // Step 1: Validate Aadhaar number (Verhoeff Algorithm)
    function validateAadhaar() {
        const aadhaarNumber = aadhaarInput.value;
        if (aadhaarNumber.length !== 12 || !isValidAadhaar(aadhaarNumber)) {
            errorMsg.innerText = "Invalid Aadhaar Number. Please enter a valid 12-digit Aadhaar.";
            return;
        }
        errorMsg.innerText = "";
        sendOTP(aadhaarNumber);
    }

    // Function to check Aadhaar using Verhoeff Algorithm
    function isValidAadhaar(aadhaar) {
        return true; // Simplified for this example
    }

    // Step 2: Send OTP (Simulate API Call)
    function sendOTP(aadhaarNumber) {
        console.log(`Sending OTP to Aadhaar Number: ${aadhaarNumber}`);
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
    }

    // Step 3: Verify OTP
    function verifyOTP() {
        const otp = otpInput.value;
        if (otp.length !== 6) {
            otpErrorMsg.innerText = "Invalid OTP. Please enter a valid 6-digit OTP.";
            return;
        }
        otpErrorMsg.innerText = "";
        generateABHA();
    }

    // Step 4: Generate ABHA Number (Simulate API Call)
    function generateABHA() {
        const abhaNumber = Math.floor(10000000000000 + Math.random() * 90000000000000);
        console.log(`Generated ABHA Number: ${abhaNumber}`);
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
        abhaNumberDisplay.innerText = abhaNumber;
    }

    // Back button functionality
    function goBack() {
        // Determine which step to go back to
        if (document.getElementById("step2").style.display === "block") {
            document.getElementById("step2").style.display = "none";
            document.getElementById("step1").style.display = "block";
        } else if (document.getElementById("step3").style.display === "block") {
            document.getElementById("step3").style.display = "none";
            document.getElementById("step2").style.display = "block";
        }
    }

    // Expose the functions to global scope
    window.validateAadhaar = validateAadhaar;
    window.verifyOTP = verifyOTP;
    window.goBack = goBack;
});
// Script for handling PHR App UI functionalities

document.getElementById("loginBtn").addEventListener("click", function () {
    // Show ABHA Number Login Form
    document.getElementById("loginSection").classList.remove("hidden");
});

document.getElementById("submitAbhaNumber").addEventListener("click", function () {
    const abhaNumber = document.getElementById("abhaNumber").value;

    if (validateAbhaNumber(abhaNumber)) {
        alert("Logged in successfully with ABHA Number: " + abhaNumber);
        document.getElementById("loginSection").classList.add("hidden");
        displayHealthRecords();
        displayConsents();
    } else {
        alert("Please enter a valid 14-digit ABHA number.");
    }
});

function validateAbhaNumber(abhaNumber) {
    // Basic validation: Check if ABHA number is 14 digits
    const regex = /^\d{14}$/;
    return regex.test(abhaNumber);
}

function displayHealthRecords() {
    // Simulate fetching health records
    const records = [
        { date: '2024-09-15', type: 'Consultation', doctor: 'Dr. A.K. Singh', details: 'General check-up' },
        { date: '2024-08-10', type: 'Lab Test', doctor: 'Dr. N. Sharma', details: 'Blood Test' }
    ];

    let healthRecordsSection = document.getElementById("healthRecords");
    records.forEach(record => {
        let recordDiv = document.createElement("div");
        recordDiv.innerHTML = `<strong>Date:</strong> ${record.date} <br> <strong>Type:</strong> ${record.type} <br> <strong>Doctor:</strong> ${record.doctor} <br> <strong>Details:</strong> ${record.details}`;
        healthRecordsSection.appendChild(recordDiv);
    });

    document.getElementById("healthRecordsSection").classList.remove("hidden");
}

function displayConsents() {
    // Simulate fetching consents
    const consents = [
        { provider: 'Apollo Hospital', status: 'Active', type: 'Auto-Approval' },
        { provider: 'Max Healthcare', status: 'Pending', type: 'Manual Approval' }
    ];

    let consentSection = document.getElementById("consents");
    consents.forEach(consent => {
        let consentDiv = document.createElement("div");
        consentDiv.innerHTML = `<strong>Provider:</strong> ${consent.provider} <br> <strong>Status:</strong> ${consent.status} <br> <strong>Type:</strong> ${consent.type}`;
        consentSection.appendChild(consentDiv);
    });

    document.getElementById("consentManagementSection").classList.remove("hidden");
}
