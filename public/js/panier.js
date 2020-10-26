let lenghtArrayProduit = localStorage.length - 1;
for(let i=1; i<=lenghtArrayProduit; i++){
    var monobjet_json = localStorage.getItem("articlePanier"+i);
    var monObjet = JSON.parse(monobjet_json);
    console.log(monObjet);
};
console.log(localStorage);
