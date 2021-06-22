let produit;
let panier = [];

let chainePanierStock = localStorage.getItem('panier');
if(chainePanierStock != null)
{
    panier = JSON.parse(chainePanierStock);
}

function getcam()
{
    fetch("http://localhost:3000/api/cameras")
    .then( res=>res.json())
    .then( cameras => 
    {
        console.log(cameras);
        for(camera of cameras)
        {
            document.getElementById('secamera').innerHTML += `
            <div class="bund">
                <div class="bund__imgSection">
                <a href=""><img src="${camera.imageUrl}" /></a>
                </div>
                <div class="bund__legend">
                    <p class="bund__legend__p">${camera.name}, le prix est de :${camera.price}</p>
                    <a href="produit.html?id=${camera._id}"><button id="buttonone" type="button" class="bund__legend__button">Personalisez</button></a>
                </div>
            </div>
            `;
            
        }
    })
}

function getDetailCam() {     

        let params = (new URL(document.location)).searchParams;
        let idde = params.get('id')

    fetch("http://localhost:3000/api/cameras/"+ idde)
    .then( res=>res.json())
    .then( camera => 
    {
        console.log(camera);
        produit = camera;
        document.querySelector('.produit__img img').src=camera.imageUrl;
        document.querySelector('.produit__name').innerHTML= `Nom : `+camera.name;
        document.querySelector('.produit__texte').innerHTML=`Description : `+camera.description;
        document.querySelector('.produit__prix').innerHTML=`Prix : `+camera.price;
        for( option of camera.lenses)
        {
            document.querySelector('.produit__select').innerHTML+= `
            <option>${option}</option>
            `;
        }
    })
}
function localstor() 
{
    let commande = {
        _id: produit._id,
        name: produit.name,
        price: produit.price,
        choix: document.querySelector('.produit__select').value
    };
    panier.push(commande);
    let chainePanier = JSON.stringify(panier);
    localStorage.setItem('panier', chainePanier);
}


