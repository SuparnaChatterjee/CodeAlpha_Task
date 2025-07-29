document.addEventListener('DOMContentLoaded', function() {
    
    const dobInput = document.getElementById('dob');
    const today = new Date().toISOString().split('T')[0];
    dobInput.setAttribute('max', today);
    
    const ageForm = document.getElementById('ageForm');
    const resultContainer = document.querySelector('.result-container');
    
    ageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        resultContainer.style.display = 'none';
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        const dobValue = dobInput.value;
        if (!dobValue) {
            showError(dobInput, 'Please enter your date of birth');
            return;
        }
        
        const dob = new Date(dobValue);
        const today = new Date();
        
        if (dob > today) {
            showError(dobInput, 'Date of birth cannot be in the future');
            return;
        }
        
        const age = calculateAge(dob, today);
        
        displayResults(age, dob, today);
    });
    
    function calculateAge(dob, today) {
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        
        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return { years, months, days };
    }
    
    function displayResults(age, dob, today) {
        
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
        
       
        const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        
        
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const birthDay = daysOfWeek[dob.getDay()];
        
       
        document.getElementById('next-birthday').textContent = 
            `Next birthday in: ${daysUntilBirthday} day${daysUntilBirthday !== 1 ? 's' : ''}`;
        document.getElementById('birth-day').textContent = 
            `You were born on a ${birthDay}`;
        
       
        resultContainer.style.display = 'block';
    }
    
    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const inputGroup = input.parentElement;
        inputGroup.appendChild(errorElement);
        
        input.focus();
    }
});
