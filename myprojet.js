document.addEventListener("DOMContentLoaded", async function() {
    /**** DOMcontentLoaded pour m'assurer que le DOM est completement chargé avant
      d'exécuter le script*/
    /**** recuperer ma div avec sa classe gallery */
    const gallery = document.querySelector(".gallery"); 
    console.log(gallery);

    /**** retourner le tableau des mes Apiworks */
    async function getApiWorks() {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json();
    }

    /***** affichage des APiWorks dans le DOM */
    async function showApiWorks(arrayApiWorks) {
        
        /***** vérification conditionnelle qui permet de s'assurer que la variable gallery a bien été assignée
         à un élément DOM avant d'essayer de l'utiliser */
        if (!gallery) {
            console.error("Gallery element not found.");
            return;
        }
        arrayApiWorks.forEach((work) => {
            /***** creation des elements */
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            /**** definir la source des mes images et le texte  */
            img.src = work.imageUrl;
            figcaption.textContent = work.title;
            /***** definir le parent et les enfants */
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
        console.log(arrayApiWorks);
    }

    /***** appeler ma function showApiworks pour garantit que le script s'exécute correctement et sans erreurs. 
     * Cela assure également une structure de code claire et organisée, facilitant la maintenance et la compréhension du code. */
    const arrayApiWorks = await getApiWorks();
    console.log(arrayApiWorks);
    await showApiWorks(arrayApiWorks);

    const filters = document.querySelector(".filters");
    console.log(filters);

    async function getApiCategories() {
        /**** creer le boutton dans le DOM */
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    }

    function createButton(name, categoryId, isSelected) { 
        /***** creer le button dans le DOM */
        const buttonElement = document.createElement("button");
        /***** j'ajoute la classe button */
        buttonElement.classList.add("button");
        buttonElement.innerText = name;
        if (isSelected) {
            buttonElement.classList.add("button_selected");
        }
        filters.appendChild(buttonElement);
        /***** j'ajoute la funtion button click pour donner l'apparence selectionné au button que je click */
        buttonElement.addEventListener("click", function (event) {
            switchColor(event.target);
            displayWorks(categoryId);
        });
    }
      /***** je gere le changmt de classe des buttons lorsque on clique dessus */
    function switchColor(target) {
        const buttons = filters.querySelectorAll("button");
        /***** je suprime la classe selected sur les boutons */
        buttons.forEach(button => button.classList.remove("button_selected"));
        /***** et je l'ajoute au button selectioné */
        target.classList.add("button_selected");
    }
     /***** pour afficher l'ensemble de projets en le filtrant avec la categoryId */
    function displayWorks(categoryId) {
        gallery.innerHTML = "";/***** pour effacer le contenu de la gallery */
        const filteredWorks = filterWorks(categoryId);
           

            showApiWorks(filteredWorks);
    }
    /***** filtrage en fonction d ela numero de categorie indique */
    function filterWorks(categoryId) {
        let filteredWorks;
        if (categoryId === undefined) { /***** si le categoryid n'est pas defini, affiche mon tableau */
            filteredWorks = arrayApiWorks;
        } else { /***** if not, affiche le tableau filtré  */
            filteredWorks = arrayApiWorks.filter(function (work) {
                return categoryId === work.categoryId;
            });
        }
        return filteredWorks;
    }

    async function displayFilters() { /**** avec asynchrone pour m'assurer que les cat sont recuperées 
    avant de creer les buttons de filtre */
        /***** j'ajoute un button tous */
        createButton("Tous", undefined, true);
        /***** je recuper le tableau de categoories uniques */
        const categories = await getApiCategories();
        /***** a chaque tour de boucle j'ajoute un button au nom de la categorie */
        for (let category of categories) {
            createButton(category.name, category.id, false);
        }
    }

    await displayFilters(); /***** appeler la fonction avec await pour m'assurer qu'elle attend
    la recuperation de categories avant de continuer */
});