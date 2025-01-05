const dobInput = document.getElementById("dob");
const resultDiv = document.getElementById("result");

// Function to format the age message
const formatAgeMessage = (years, months, days) => {
    return `Your Age is <strong>${years} Years, ${months} Months, ${days} Days</strong>`;
};

// Edge case handling
const calculateAge = (dob) => {
    const currentDate = new Date();
    const userDob = new Date(dob);

    // Add input validation
    if (!userDob.getTime() || isNaN(userDob.getTime())) {
        throw new Error("Invalid date format");
    }

    let years = currentDate.getFullYear() - userDob.getFullYear();
    let months = currentDate.getMonth() - userDob.getMonth();
    let days = currentDate.getDate() - userDob.getDate();

    // Adjust for end of month cases
    if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
};

// Function to handle the date of birth change event
const handleDobChange = () => {
    const dob = dobInput.value;

    if (!dob) {
        resultDiv.innerHTML = "Please select a valid date of birth.";
        return;
    }

    const dobDate = new Date(dob);
    if (dobDate > new Date()) {
        resultDiv.innerHTML = "Date of birth cannot be in the future.";
        return;
    }

    const { years, months, days } = calculateAge(dob);
    resultDiv.innerHTML = formatAgeMessage(years, months, days);
};

// Event listener for date of birth input change
dobInput.addEventListener("change", handleDobChange);