function isconnected() {
    const mytoken = localStorage.getItem("token");
    if (mytoken === null) { 
        return false
    } else {
        return true
    };

};
document.addEventListener("DOMContentLoaded", async function() {

    /***** Sélectionne l'élément HTML avec la classe "gallery" */
    const gallery = document.querySelector(".gallery");

    /***** Sélectionne l'élément HTML avec la classe "filters" */
    const filters = document.querySelector(".filters");

    /***** Fonction pour récupérer les "works" depuis l'API */
    async function getApiWorks() {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json();
    }

    /***** Fonction pour récupérer les "categories" depuis l'API */
    async function getApiCategories() {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    }

    /***** Fonction pour afficher les "works" dans la galerie */
    function showApiWorks(arrayApiWorks) {
        /***** Efface le contenu actuel de la galerie */
        gallery.innerHTML = "";
        
        /***** Pour chaque work dans le tableau arrayApiWorks */
        arrayApiWorks.forEach((work) => {
            // Crée les éléments HTML pour chaque work
            const figureEL = document.createElement("figure");
            const imgEL = document.createElement("img");
            const figcaption = document.createElement("figcaption");

            // Définit la source de l'image et le texte de la légende
            imgEL.src = work.imageUrl;
            figcaption.textContent = work.title;

            // Ajoute l'image et la légende à la figure
            figureEL.appendChild(imgEL);
            figureEL.appendChild(figcaption);

            // Ajoute la figure à la galerie
            gallery.appendChild(figureEL);
        });
    }

    /***** Fonction pour créer un bouton de filtre */
    function createButton(name, categoryId) {
        /**** Crée un élément bouton et ajoute la classe button */
        const button = document.createElement("button");
        button.classList.add("button");

        /***** Définir le texte du bouton */
        button.innerText = name;

        /**** Ajoute le bouton aux filtres */
        filters.appendChild(button);

        /***** Ajoute un écouteur d'événement pour le clic */
        button.addEventListener("click", async () => {
            /***** Retire la classe "button_selected" de tous les boutons et l'ajoute au bouton cliqué */
            document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("button_selected"));
            button.classList.add("button_selected");

            /***** Affiche dans la console l'ID de la catégorie cliquée */
            console.log(categoryId);

            /**** Récupère les works depuis l'API */
            const works = await getApiWorks();

            /***** Filtre les works en fonction de la catégorie cliquée */
            /***** Si aucune catégorie spécifique n'est sélectionnée, affiche tous les 'works'. 
             * Sinon, affiche seulement les 'works' qui appartiennent à la catégorie sélectionnée." */
            const selectedWorks = categoryId === undefined ? works : works.filter(work => work.categoryId === categoryId);
            console.log(categoryId, selectedWorks);

            /***** Affiche les works filtrés dans la galerie */
            showApiWorks(selectedWorks);
        });
    }

    /***** Fonction pour afficher les filtres */
    async function displayFilters() {
        /***** Crée un bouton "Tous" pour afficher tous les works */
        createButton("Tous", undefined);

        /***** Sélectionne le bouton "Tous" par défaut */
        document.querySelector(".filters button").classList.add("button_selected");

        /***** Récupère les catégories depuis l'API */
        const categories = await getApiCategories();

        /***** Pour chaque catégorie, crée un bouton avec le nom de la catégorie et l'id de la catégorie */
        categories.forEach(category => createButton(category.name, category.id));
        console.log(categories);
    }

    /***** Affiche les filtres */
    await displayFilters();

    /***** Affiche tous les works par défaut */
    const works = await getApiWorks();
    showApiWorks(works);
    console.log(works);

    /***** Mode édition */

    function myBannerOn() {
        const myBanner = document.querySelector(".edit_mode"); 
    
        const iconeElement = document.createElement("i");
        const textElement = document.createElement("p");
    
        console.log(myBanner, iconeElement, textElement);
    
        iconeElement.classList.add("fa-regular", "fa-pen-to-square");
        iconeElement.classList.add("mode-edition", "i");
        textElement.innerText = "Mode édition";
        textElement.classList.add("mode-edition", "p");
    
        myBanner.appendChild(iconeElement);
        myBanner.appendChild(textElement);
    
        const loginLink = document.querySelector(".loginL"); 
        const logoutLink = document.querySelector(".logoutL"); 

        const mytitle = document.querySelector(".divprojets");
        console.log(mytitle);
        const mytitlediv = document.createElement("div");
        mytitlediv.classList.add(".divprojetsdiv");
        const mytitleicone = document.createElement('i');
        mytitleicone.classList.add("fa-regular", "fa-pen-to-square");
        const mytitleelemment = document.createElement("p");
        mytitleelemment.innerText = "modifier"
       

        mytitle.appendChild(mytitlediv);
        mytitlediv.appendChild(mytitleicone);
        mytitlediv.appendChild(mytitleelemment);
        
    
       
    
        if (isconnected()) {

            myBanner.style.display = "flex";
            iconeElement.style.display = "flex";
            mytitlediv.style.display = "flex"
           
    
            if (loginLink) loginLink.style.display = "none";
            if (logoutLink) logoutLink.style.display = "block";
            
    
            const filters = document.querySelector(".filters"); 
            if (filters) filters.style.display = "none";

          
        } else {
            myBanner.style.display = "none";
            iconeElement.style.display = "none";
            mytitleelemment.style.display = "none"
            mytitleicone.style.display = "none"
    
            if (loginLink) loginLink.style.display = "block";
            if (logoutLink) logoutLink.style.display = "none";
            
        }; 
    
    };
    
    myBannerOn(); // Call myBannerOn function after DOMContentLoaded

    const logoutLink = document.querySelector(".logoutL"); 
    if (logoutLink) {
        logoutLink.addEventListener("click", function(event) {
            localStorage.removeItem("token");
            window.location.href = "./index.html";
            
        });
      
    }    
    
});

