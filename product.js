let get = function(url){
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                if(request.status === 200)
                    resolve(request.responseText);
                else
                    reject(request);        
            };
        };
        request.open('GET', url, true);
        request.send();
    });
};
let catchError = function(error){
    console.error('Erreur AJAX', error);
};

const urlPage = window.location.href;
if(urlPage === "file:///C:/Users/mikae/Desktop/Formation%20OC/Git/MikaelTrevidic_5_13102020/produit.html?5be9c8541c9d440000665243"){
    let products = function(){
        get('http://localhost:3000/api/teddies').then(function(response){
            let produits = JSON.parse(response);
            let descriptionProduit = document.querySelector('#description');
            descriptionProduit.innerHTML = produits[0].name + "<br>" + produits[0]._id;
        }).catch(catchError);
    };
    products();
}else{
    let productsImage = function(){
        get('http://localhost:3000/api/teddies').then(function(response){
            let produits = JSON.parse(response);
            let imageProduit = document.querySelector('#imgAlaUne');
            imageProduit.src = produits[3].imageUrl;
        }).catch(catchError);
    };
    let productsName = function(){
        get('http://localhost:3000/api/teddies').then(function(response){
            let produits = JSON.parse(response);
            let lenghtArray = produits.length;
            let blocNomsProduits = document.querySelector('#products-list');
            let names;
            for(let i = 0; i < lenghtArray; i++){
                names = document.createElement('li');
                names.innerHTML = "<a href='produit.html?"+produits[i]._id+"'>"+produits[i].name+"</a>";
                blocNomsProduits.appendChild(names);
            };
        }).catch(catchError);
    };
    productsImage();
    productsName();
 };
