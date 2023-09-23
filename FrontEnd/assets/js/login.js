document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

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
                throw new Error("Informations utilisateur / mot de passe incorrectes");
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
            var errorElement = document.getElementById("error-message");
            errorElement.textContent = error.message;
        });
});