const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#login-submit');

emailInput.addEventListener('input', function () {
    hideValidationError(emailInput, false);
    if (emailInput.value.trim() === '') {
        showValidationError(emailInput, false);
    } else if (!validateEmail(emailInput.value.trim())) {
        showValidationError(emailInput, false, 'Format incorrect');
    } else {
        hideValidationError(emailInput, false);
    }
});

passwordInput.addEventListener('input', function () {
    if (passwordInput.value === '') {
        showValidationError(passwordInput, false);
    } else {
        hideValidationError(passwordInput, false);
    }
});

submitButton.addEventListener('click', async (e) => {
    checkLoginFormValidity(emailInput, passwordInput);
    
    e.preventDefault();

    if(!emailInput.classList.contains("error-input") && !passwordInput.classList.contains("error-input")){
        
        var email = emailInput.value;
        var password = passwordInput.value;
    
        if(!validateEmail(email)) {
            showValidationError(emailInput, false, 'Format incorrect');
            return;
        }
    
        var data = {
            email: email,
            password: password
        };
    
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error("Adresse mail ou mot de passe invalide");
                } else {
                    throw new Error("Erreur lors de la connexion");
                }
            })
            .then(function (responseData) {
                var token = responseData.token;
                localStorage.setItem("token", token);
    
                window.location.href = "index.html";
            })
            .catch(function (error) {
                showValidationError(passwordInput, false, error.message);
                passwordInput.value = '';
            });
    }
})