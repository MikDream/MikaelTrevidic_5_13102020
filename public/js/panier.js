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
    for(let i=0; i<cart.length; i++){
        let ul = document.querySelector('.panier > ul');
        var article = document.createElement('li');
        article.setAttribute("id", "articlePanier"+i);
        article.innerHTML = (i+1)+" : "+cart[i].nom+" -- X"+cart[i].quantite+" : "+(cart[i].prix*cart[i].quantite)+"€ ";
        ul.appendChild(article);
        let supress = document.createElement('input');
        supress.setAttribute("type", "button");
        supress.setAttribute("value", "Retirer");
        article.appendChild(supress);
    };
};
let getCart = function(){
    var cartArray_json = localStorage.getItem("panier");
    let cartArray = [];
    if(cartArray_json == null){
        let emptyMessage = document.querySelector('.panier');
        let message = document.createElement('p');
        message.innerHTML = "VOTRE PANIER EST VIDE<br><a href='index.html'>Tous les produits</a>";
        emptyMessage.prepend(message);
    }else{
        cartArray = JSON.parse(cartArray_json);
        console.log(cartArray);
        let numArticle = document.createElement('p');
        numArticle.textContent = "Vous avez "+cartArray.length+" articles dans votre panier.";
        sameArticle(cartArray);
        let cartMessage = document.querySelector('.panier');
        cartMessage.prepend(numArticle);
        console.log(cartArray);
        vueCart(cartArray);
    };
};
let emptyCart = function(){
    document.querySelector('#emptyCart').addEventListener('click', function(){
        localStorage.clear();
        location.reload();
    });
};
getCart();
emptyCart();
