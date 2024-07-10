document.addEventListener("DOMContentLoaded", async function() {
    const modal = document.querySelector(".modal");
    const closeModalBtns = document.querySelectorAll(".closebtn");
    const modal1 = document.getElementById("modal1");
    const modal2 = document.getElementById("modal2");
    const leftArrows = document.querySelectorAll(".leftarrow");
    const divProjets = document.querySelector(".divprojets");
    const myModalButton = document.querySelector(".mymodalbutton");

     // Fonction pour ouvrir la première modale
     async function openModal() {
        modal.style.display = "block";
        modal1.style.display = "block";
        modal2.style.display = "none";
        leftArrows.forEach(arrow => arrow.style.display = "none");

        // Récupère et affiche les works dans la modale
        const works = await getApiWorks();
        showWorksInModal(works);
    }

    // Fonction pour ouvrir la deuxième modale
    function openModal2() {
        modal1.style.display = "none";
        modal2.style.display = "block";
        leftArrows.forEach(arrow => arrow.style.display = "block");
    }

    // Fonction pour fermer la modale
    function closeModalFunc() {
        modal.style.display = "none";
    }

    // Ajouter les écouteurs d'événements
    divProjets.addEventListener("click", openModal);
    myModalButton.addEventListener("click", openModal2);
    closeModalBtns.forEach(btn => btn.addEventListener("click", closeModalFunc));
    
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    leftArrows.forEach(leftArrow => {
        leftArrow.addEventListener("click", openModal);
    });

    // Fonction pour récupérer les works et les categroies depuis l'API
    async function getApiWorks() {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json();
    }

    


    // Fonction pour afficher les works dans la première modale
    function showWorksInModal(works) {
        const myModalPhotoDiv = document.querySelector(".mymodalphotodiv");
        myModalPhotoDiv.innerHTML = ""; // Efface le contenu actuel

        works.forEach(work => {
            const figureEL = document.createElement("figure");
            const imgEL = document.createElement("img");
            const trashIcon = document.createElement("i");

            imgEL.src = work.imageUrl;

            trashIcon.classList.add("fa-solid", "fa-trash-can", "trash-icon");
            trashIcon.dataset.workId = work.id;

            figureEL.classList.add("pictureelementdiv");
            figureEL.appendChild(imgEL);
            figureEL.appendChild(trashIcon);

            myModalPhotoDiv.appendChild(figureEL);

            // Ajouter un écouteur d'événement pour la suppression
            trashIcon.addEventListener("click", async (event) => {
                const workId = event.target.dataset.workId;
                await deleteWork(workId);
                figureEL.remove(); // Supprime l'élément de l'interface utilisateur
            });
        });
    }

    // Fonction pour supprimer un work depuis l'API

    function getUserToken() {
        return localStorage.getItem('token');
    }

    async function deleteWork(workId) {
        const myToken = getUserToken();
        console.log("Token d'utilisateur :", myToken); 
        if (!myToken) {
            console.error("Token d'utilisateur introuvable");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getUserToken()}`,
                },
            });
            if (response.status === 204) {
                console.log("item deleted.");
                removeWorkFromDOM(workId);
            } else {
                console.error("Erreur : Échec de la suppression du projet.");
            }
        } catch (error) {
            console.error("Erreur :", error);
        }
    } deleteWork();

    // Fonction pour supprimer le work de l'interface utilisateur (DOM)
    function removeWorkFromDOM(workId) {
        // Sélectionne l'élément avec l'icône de la corbeille qui a l'ID du travail spécifié
        const trashIcon = document.querySelector(`.trash-icon[data-work-id="${workId}"]`);
    
        // Si l'icône de la corbeille existe
        if (trashIcon) {
            // Sélectionne l'élément parent de l'icône de la corbeille (le conteneur du travail)
            const workElement = trashIcon.parentElement;
    
            // Supprime cet élément parent du DOM
            workElement.remove();
        }
    }

});
