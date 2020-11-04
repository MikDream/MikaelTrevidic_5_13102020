compteurPanier();
let sameArticle = function(array){
    array.sort((a, b) => {
        let fa = a.nom.toLowerCase(),
            fb = b.nom.toLowerCase();
        if(fa<fb){
            return -1;
        }
        if(fa>fb){
            return 1;
        }
        return 0;
    });
    for(i = 1; i < array.length; i++){
        if(array[i].nom===array[i-1].nom){
            let addQuantite = array[i-1].quantite;
            addQuantite++;
            array[i].quantite = addQuantite;
            array.splice(i-1, 1);
            i=0;
        };
    };
};
let totalCommande = function(panier, quantite){
    let cartBlock = document.querySelector('.panier');
    let total = document.createElement('p');
    total.textContent = "Vous avez "+quantite+" article(s) dans votre panier, pour un total de "+formatPrix(panier)+"€";
    cartBlock.appendChild(total);
};
let vueCart = function(cart){
    let x = 0;
    let prixTotalPanier = 0;
    let quantiteTotale = 0;
    for(let i=0; i<cart.length; i++){
        let cartBlock = document.querySelector('.panier');
        let article = document.createElement('div');
        let img = document.createElement('img');
        let text = document.createElement('div');
        let nomArticle = document.createElement('h3');
        let quantite = document.createElement('p');
        let prix = document.createElement('p');
        let prixTotalArticle = document.createElement('p');
        prixTotalPanier += (cart[i].prix*cart[i].quantite);
        quantiteTotale += cart[i].quantite;
        article.setAttribute("class", "card");
        if (x == i) {
            article.setAttribute("class", "card backgroundAlt");
            x+=2;
        };
        img.setAttribute("src", cart[i].image)
        img.setAttribute("alt", "image de "+cart[i].nom);
        text.setAttribute("class", "card__text");
        nomArticle.textContent = cart[i].nom;
        quantite.textContent = "Quantité : "+cart[i].quantite;
        prix.textContent = "Prix unitaire : "+formatPrix(cart[i].prix)+"€";
        prixTotalArticle.textContent = "Prix total : "+formatPrix((cart[i].prix*cart[i].quantite))+"€";
        text.append(nomArticle, quantite, prix, prixTotalArticle);
        article.append(img, text);
        cartBlock.appendChild(article);
    };
    totalCommande(prixTotalPanier, quantiteTotale);
};
let getCart = function(){
    var cartArray_json = localStorage.getItem("panier");
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
        commander();
    };
};
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
let commander = function(){
    let parentBlock = document.querySelector('.panier');
    let btnCommander = document.createElement('input');
    btnCommander.setAttribute('id', 'commander');
    btnCommander.setAttribute('class', 'button');
    btnCommander.setAttribute('type', 'button');
    btnCommander.setAttribute('value', 'Passer la commande');
    parentBlock.appendChild(btnCommander);
    document.querySelector('#commander').addEventListener('click', function(){
        document.querySelector('#shipment').style.display = "flex";
    });
};
let formatPrix = function(prix){
    let resultat = prix / 100;
    new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(resultat);
    return resultat;
};
getCart();
