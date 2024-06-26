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
    console.log(getApiWorks);

    /***** Fonction pour récupérer les "categories" depuis l'API */
    async function getApiCategories() {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    }
    console.log(getApiCategories);

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
            console.log(figureEL, imgEL, figcaption);

            // Définit la source de l'image et le texte de la légende
            imgEL.src = work.imageUrl;
            figcaption.textContent = work.title;

            // Ajoute l'image et la légende à la figure
            figureEL.appendChild(imgEL);
            figureEL.appendChild(figcaption);

            // Ajoute la figure à la galerie
            gallery.appendChild(figureEL);
        });
    }console.log(showApiWorks);

    /***** Fonction pour créer un bouton de filtre */
    function createButton(name, categoryId) {
        /**** Crée un élément bouton et ajout la classe button */
        const button = document.createElement("button");
        button.classList.add("button");

        /***** Définir le texte du bouton */
        button.innerText = name;

        /**** Ajoute le bouton aux filtres */
        filters.appendChild(button);

        /***** Ajoute un écouteur d'événement pour le clic */
        button.addEventListener("click", async () => {
            /***** Retirer la classe "button_selected" de tous les boutons et l'ajouter au buton cliqué */
            document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("button_selected"));
            button.classList.add("button_selected");

            /***** Affiche dans la console l'ID de la catégorie cliquée */
            /***console.log(categoryId);*/

            /**** Récupèrer les works depuis l'API */
            const works = await getApiWorks();

            /***** Filtre les works en fonction de la catégorie cliquée */
            /*****Si aucune catégorie spécifique n'est sélectionnée, affiche tous les 'works'. 
             * Sinon, affiche seulement les 'works' qui appartiennent à la catégorie sélectionnée." */
            const selectedWorks = categoryId === undefined ? works : works.filter(work => work.categoryId === categoryId);
            console.log(categoryId, selectedWorks);

            /***** Affiche les works filtrés dans la galerie */
            showApiWorks(selectedWorks);
        });
    }

    /***** Fonction pour afficher les filtres */
    async function displayFilters() {
        /***** ma fucntion pour creer un bouton "Tous" pour afficher tous les works */
        /***** avec la valeur undefined pour l'id de categorie */
        createButton("Tous", undefined);
        /***** Sélectionne le bouton "Tous" par défaut */
        document.querySelector(".filters button").classList.add("button_selected");

        /***** Récupère les catégories depuis l'API */
        /***** ma variable categories contient mon tableau des cat recuperees */
        const categories = await getApiCategories();

        /***** Pour chaque catégorie, crée un bouton avec le nom de la categorie et l'id de la cat
         * pour creer un button avec le nom corespondant
        */
        categories.forEach(category => createButton(category.name, category.id));
        console.log(categories);
        
    }

    /***** Affiche les filtres */
    await displayFilters();

    /***** Affiche tous les works par défaut */
    const works = await getApiWorks();
    showApiWorks(works);
    console.log(works);
});