document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    console.log(form);
    const emailInput = document.getElementById('email');
    console.log(emailInput);
    const passInput = document.getElementById('passwrd');
    console.log(passInput);

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); /***** Empêche le rechargement de la page lors de la soumission du formulaire */

        /**** Mes valeurs saisies par l'utilisateur */
        const myemail = emailInput.value;
        const mypassword = passInput.value;

        async function myLogin() {
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: myemail, password: mypassword }) /*****convertir en json avec la function jsaon.stringify */
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('authToken', token); /***** Stocker le token dans localStorage */
                return true;
            } else {
                return false;
            }
        }

        const loginSuccessful = await myLogin();

        /***** Si la connexion est réussie, rediriger vers index.html, sinon afficher un message d'erreur */
        if (loginSuccessful) {
            document.location.href = "index.html";
        } else {
            alert('try again');
        }
    });
});