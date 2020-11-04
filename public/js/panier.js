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
let vueCart = function(cart){
    let x = 0;
    for(let i=0; i<cart.length; i++){
        let cartBlock = document.querySelector('.panier');
        let article = document.createElement('div');
        let img = document.createElement('img');
        let text = document.createElement('div');
        let nomArticle = document.createElement('h3');
        let quantite = document.createElement('p');
        let prix = document.createElement('p');
        let prixTotal = document.createElement('p');
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
        prix.textContent = "Prix unitaire : "+cart[i].prix+"€";
        prixTotal.textContent = "Prix total : "+(cart[i].prix*cart[i].quantite)+"€";
        text.append(nomArticle, quantite, prix, prixTotal);
        article.append(img, text);
        cartBlock.appendChild(article);
    };
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
        console.log(cartArray[0]);
        
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
getCart();
