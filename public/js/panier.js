compteurPanier();
//Fonction de vérification des doublons dans le local storage
let sameArticle = function(array){
    array.sort((a, b) => {              //Tri des produits par ordre alphabétique
        let fa = a.nom.toLowerCase(),
            fb = b.nom.toLowerCase();
        if(fa<fb)
            return -1;
        if(fa>fb)
            return 1;
        return 0;
    });
    for(i = 1; i < array.length; i++){      //Suppression des doublons et ajouts de la quantité
        if(array[i].nom===array[i-1].nom){
            let addQuantite = array[i-1].quantite;
            addQuantite++;
            array[i].quantite = addQuantite;
            array.splice(i-1, 1);
            i=0;
        };
    };
};
//Affichage du prix total du panier
let totalCommande = function(panier){
    let cartBlock = document.querySelector('.panier');
    let total = document.createElement('p');
    total.style.padding = "0 10px";
    total.textContent = "Montant total de votre commande : "+formatPrix(panier)+"€";
    cartBlock.appendChild(total);
};
let imgCard = function(cart){
    let img = document.createElement('img');
    img.setAttribute("src", cart.image)
    img.setAttribute("alt", "image de "+cart.nom);
    return img;
};
let createCard = function(cart){
    let text = document.createElement('div');
    let nomArticle = document.createElement('h3');
    let quantite = document.createElement('p');
    let prix = document.createElement('p');
    let prixTotalArticle = document.createElement('p');
    text.setAttribute("class", "card__text");
    nomArticle.textContent = cart.nom;
    quantite.textContent = "Quantité : "+cart.quantite;
    prix.textContent = "Prix unitaire : "+formatPrix(cart.prix)+"€";
    prixTotalArticle.textContent = "Prix total : "+formatPrix((cart.prix*cart.quantite))+"€";
    text.append(nomArticle, quantite, prix, prixTotalArticle);
    return text;
};
//Affichage des articles du panier
let vueCart = function(cart){
    let x = 0;
    let prixTotalPanier = 0;
    for(let i=0; i<cart.length; i++){
        let cartBlock = document.querySelector('.panier');
        let article = document.createElement('div');
        let img = imgCard(cart[i]);
        let text = createCard(cart[i]);
        prixTotalPanier += (cart[i].prix*cart[i].quantite);
        article.setAttribute("class", "card");
        if (x == i) {
            article.setAttribute("class", "card backgroundAlt");
            x+=2;
        };
        article.append(img, text);
        cartBlock.appendChild(article);
    };
    totalCommande(prixTotalPanier);
};
//Fonction de récupération du localStorage et appel des différentes fonction
let getCart = function(){
    let cartArray_json = localStorage.getItem("panier");
    let cartArray = [];
    if(cartArray_json == null){
        let emptyMessage = document.querySelector('.panier');
        let message = document.createElement('p');
        message.setAttribute('class', 'subTextCart')
        message.innerHTML = "VOTRE PANIER EST VIDE<br><a href='index.html'>Tous les produits</a>";
        emptyMessage.appendChild(message);
    }else{
        cartArray = JSON.parse(cartArray_json);
        let numArticle = document.createElement('p');
        numArticle.setAttribute('class', 'subTextCart');
        numArticle.textContent = "Vous avez "+cartArray.length+" articles dans votre panier.";
        sameArticle(cartArray);
        let cartMessage = document.querySelector('.panier');
        cartMessage.appendChild(numArticle);
        vueCart(cartArray);
        emptyCart();
        displayForm();
    };
};
//Bouton pour vider le panier
let emptyCart = function(){
    let parentBlock = document.querySelector('.panier');
    let supressAll = document.createElement('input');
    supressAll.setAttribute('id', 'emptyCart');
    supressAll.setAttribute('class', 'button');
    supressAll.setAttribute('type', 'button');
    supressAll.setAttribute('value', 'Vider le panier');
    parentBlock.appendChild(supressAll);
    document.querySelector('#emptyCart').addEventListener('click', function(){
        localStorage.clear();
        location.reload();
    });
};
//Affichage du formulaire de commande
let displayForm = function(){
    let parentBlock = document.querySelector('.panier');
    let btnCommander = document.createElement('input');
    btnCommander.setAttribute('id', 'commander');
    btnCommander.setAttribute('class', 'button');
    btnCommander.setAttribute('type', 'button');
    btnCommander.setAttribute('value', 'Passer la commande');
    parentBlock.appendChild(btnCommander);
    document.querySelector('#commander').addEventListener('click', function(){
        document.querySelector('#orderInfos').style.display = "flex";
        validOrder(); //Appel de la fonction de validation du panier
    });
};
//Fonction de formatage du prix
let formatPrix = function(prix){
    let resultat = prix / 100;
    new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(resultat);
    return resultat;
};
function Contact(prenom, nom, adresse, ville, mail){
    this.firstName = prenom;
    this.lastName = nom;
    this.address = adresse;
    this.city = ville;
    this.email = mail;
};
//Fonction pour assainir les infos entrées par l'utilisateur
let sanityzeForm = function(string){
    let nonValid = /([^\wëéè\-ÉÈ])|([_])/gm;
    let suppress ='';
    let newString = string.replace(nonValid, suppress);
    return newString;
};
//Vérification de l'email
var validMail = function(email){
    return /^([^\s@]{2,})+@([^\s@]{2,})+(\.{1})+([a-z]|[0-9]{0,})+[^\s@]+$/.test(email);
};
//Fonction de vérification des entrées utilisateur pour éviter les espaces
let testInput = function(input){
    let inputElement = input;
    let textError = "";
    input = sanityzeForm(input.value);
    if(/[^ ]{2,}/g.test(input))
        return input;
    else
        textError = document.createElement('small');
        textError.setAttribute('class', 'error');
        let labelForError = document.querySelector("label[for="+inputElement.id+"]");
        labelForError = labelForError.getAttribute('name');
        textError.textContent = "Le format de votre "+labelForError+" n'est pas valide !";
        inputElement.after(textError);
        return false;
}
//Requete POST
let postOrder = function(send, orderPrice){
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function(){
        if(request.readyState === 4){
            if(request.status === 201){
                let response = request.responseText;
                response = JSON.parse(response);
                let orderID = response.orderId;
                localStorage.clear();
                let price = JSON.stringify(orderPrice);
                localStorage.setItem('orderId', orderID);
                localStorage.setItem('price', price);
                let pathUrlArray = window.location.pathname.split( "/" );
                pathUrlArray.pop();
                pathUrlArray.push('confirm.html');
                let redirectPath = "";
                for(i=0; i<pathUrlArray.length; i++){
                    redirectPath += "/";
                    redirectPath += pathUrlArray[i];
                };
                window.location.pathname=redirectPath;
            }
        }
    };
    request.send(send);
};
//Création de l'objet Order pour la requete POST
let createOrder = function(contact){
    let products = [];
    let price = 0;
    let itemsJson = localStorage.getItem("panier");
    let items = JSON.parse(itemsJson);
    for(let i = 0; i<items.length; i++){
        products.push(items[i].id);
        price += items[i].prix;
    };
    let order = {contact, products};
    let orders = JSON.stringify(order);
    postOrder(orders, price);
    console.log(orders);
};
//Fonction de validation du formulaire
let validOrder = function(){
    document.querySelector('#orderInfos').addEventListener('submit', function(e){
        let mail = document.querySelector('#email');
        if(validMail(mail.value)){
            let firstName = testInput(document.querySelector('#prenom'));
            let lastName = testInput(document.querySelector('#nom'));
            let address = testInput(document.querySelector('#adresse'));
            let city = testInput(document.querySelector('#ville'));
            if(firstName != false && lastName != false && address != false && city != false){
                let contact = new Contact(firstName, lastName, address, city, mail.value);
                createOrder(contact);
            }
        }else{
            let mailError = document.createElement('small');
            mailError.setAttribute('class', 'error');
            let labelForMailError = document.querySelector("label[for="+mail.id+"]");
            labelForMailError = labelForMailError.getAttribute('name');
            mailError.textContent = "Votre "+labelForMailError+" n'est pas valide !";
            mail.after(mailError);
        };
        e.preventDefault();
    });
};   
getCart();