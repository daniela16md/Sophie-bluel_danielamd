let works = []; /**** l'esemble des projets */

async function getMyWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (response.status === 200) {
            works = await response.json();
            return true;
        }
    }catch(error) {
         console.log(error);
    }
    return false;
    
};

const galleryElem = document.querySelector(".gallery");
console.log(galleryElem);

function createWork(work) {
    const figureElem = document.createElement("figure");

    const imageElem = document.createElement("img");
    imageElem.src = work.imageUrl;
    imageElem.alt = work.title;
    /* crossOrigin pour que les images puissent s'afficher sinon renvoi une erreur empechant le chargement d'images depuis un serveur externe */
    imageElem.crossOrigin = "anonymous";
    figureElem.appendChild(imageElem);

    const figcaptionElem = document.createElement("figcaption");
    figcaptionElem.innerText = work.title;
    figureElem.appendChild(figcaptionElem);

    galleryElem.appendChild(figureElem);
}