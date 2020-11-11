let orderID = localStorage.getItem('orderId');
let price = localStorage.getItem('price');
console.log(orderID);
console.log(price);
let confirmText = function(){
    let confirm = document.querySelector('.confirm__text');
    let test = document.querySelector('.confirm__text > p');
    let orderId = document.createElement('p');
    let orderPrice = document.createElement('p');
    orderId.innerText = 'Votre commande porte le numéro : '+orderID;
    orderPrice.innerText = 'Le prix total de votre commande est de : '+formatPrix(price)+'€';
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