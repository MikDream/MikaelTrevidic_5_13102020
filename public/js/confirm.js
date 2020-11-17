let orderID = localStorage.getItem('orderId');
let price = localStorage.getItem('price');
console.log(orderID);
console.log(price);
let confirmText = function(){
    let confirm = document.querySelector('.confirm__text');
    let test = document.querySelector('.confirm__text > p');
    let orderId = document.createElement('p');
    let orderPrice = document.createElement('p');
    orderId.innerHTML = "Votre commande porte le numéro : <span class='important'>"+orderID+"</span>";
    orderPrice.innerHTML = "Le prix total de votre commande est de : <span class='important'>"+formatPrix(price)+"€</span>";
    confirm.insertBefore(orderId, test);
    confirm.insertBefore(orderPrice, test);
}
let formatPrix = function(prix){
    let resultat = prix / 100;
    new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(resultat);
    return resultat;
};
confirmText();
document.querySelector('.confirm__text > p > a').addEventListener('click', function(){
    localStorage.clear();
});