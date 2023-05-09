// Récupérer l'input via son id et la valeur saisie
let inputPassword = document.getElementById("input-password");
// Récupérer le compteur score via son id
let score = document.getElementById("score");

// Ajouter un écouteur d'événements keyup pour détecter les changements dans le champ de saisie
inputPassword.addEventListener("keyup", function () {
    calculPasswordStrength();
});

function calculPasswordStrength() {
    // Récupérer la valeur saisie dans le champ de saisie
    let password = inputPassword.value;
    // Diviser le mot de passe en un tableau de caractères
    let passwordArray = password.split("");
    // Initialiser les compteurs pour chaque type de caractère
    let countNumbers = 0;
    let countLowercase = 0;
    let countUppercase = 0;
    let countSymbols = 0;

    // Parcourir chaque caractère du mot de passe
    passwordArray.forEach(function (char) {
        // Vérifier si le caractère est un chiffre
        if (char.match(/[0-9]/)) {
            countNumbers++;
        // Vérifier si le caractère est une lettre minuscule
        } else if (char.match(/[a-z]/)) {
            countLowercase++;
        // Vérifier si le caractère est une lettre majuscule
        } else if (char.match(/[A-Z]/)) {
            countUppercase++;
        // Vérifier si le caractère est un symbole
        } else if (char.match(/[!#$*%_?\\]/)) {
            countSymbols++;
        }
    });

    // Réinitialiser le compteur du PasswordStrength
    counter = 0;
    // Ajouter 25 points pour chaque condition remplie
    if (countNumbers >= 3) {
        counter += 25;
    }
    if (countLowercase >= 6) {
        counter += 25;
    }
    if (countUppercase >= 3) {
        counter += 25;
    }
    if (countSymbols >= 2) {
        counter += 25;
    }

    // Afficher la force du mot de passe dans la div score
    score.textContent = counter;
    
    let progressBar = document.createElement('progress-bar');
    progressBar.setAttribute('progress', counter);
    container.innerHTML = '' ;
    container.appendChild(progressBar); 
}

// Définition de la classe ProgressBar étendant HTMLElement
class ProgressBar extends HTMLElement {
    // Définition du constructeur
    constructor() { 
        // Appel du constructeur parent
        super(); 
        // Création d'un "shadow root" encapsulé
        this.shadow = this.attachShadow({ mode: "open" });
        
    } 

    // Ajout de l'élément dans le DOM
    connectedCallback() {
        this.progress = this.getAttribute('progress');
        // Initialisation de la variable de progression
        console.log('log 1 : ' , this.progress);
        // Appel de la fonction render
        this.render();
    }

    static get observedAttributes() {
        return [
            "progress"
        ];
    }

    // Définition d'une méthode appelée lorsqu'un des attributs observés est modifié
    attributeChangedCallback() {

        // Appeler la méthode "render" pour mettre à jour l'élément HTML avec les nouvelles valeurs d'attribut
        this.render();
    }

    // Définition de la fonction render
        render() {
            console.log('log 2 : ' , this.progress);
            // Mise à jour du "shadow root"
            this.shadow.innerHTML = `
            <style>
                /* Style de la barre de progression */
                .progress-bar {
                    width: 50%;
                    height: 20px;
                    background-color:red;
                    border-radius: 5px;
                }
            
            /* Style de la progression */
            .progress {
                height: 100%;
                border-radius: 5px;
                background-color: green;

                /* Mise à jour de la largeur en fonction de la progression */
                width: ${this.progress}%; 
            }
            </style>
            
            <div class='progress-bar'>
                <div class='progress'></div>
            </div>
            `;
        }
        
}
// Enregistrement de la définition de l'élément personnalisé "progress-bar"
customElements.define("progress-bar", ProgressBar);