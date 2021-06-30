let produit;
let panier = [];
let tabdonne = [];

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
            let pricu = (camera.price)/100;
            document.getElementById('secamera').innerHTML += `
            <div class="bund">
                <div class="bund__imgSection">
                <a href=""><img src="${camera.imageUrl}" /></a>
                </div>
                <div class="bund__legend">
                    <p class="bund__legend__p">${camera.name}, le prix est de : ${pricu} &euro;</p>
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

        let pricer = (camera.price)/100;

        document.querySelector('.produit__img img').src=camera.imageUrl;
        document.querySelector('.produit__name').innerHTML= `Nom : `+camera.name;
        document.querySelector('.produit__texte').innerHTML=`Description : `+camera.description;
        document.querySelector('.produit__prix').innerHTML=`Prix : `+ pricer + ' ' + '&euro;';
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

function affichePanier() 
{  

    let prod = document.getElementById('commandes')
    for( let i=0;i<panier.length;i++)
    {  
        prod.innerHTML += `
        <tr>
            <td>${panier[i].name}</td>
            <td>${panier[i].price/100}&euro;</td>
            <td>
                <button type="button" class="btn btn-primary rounded-pill" onclick="supprimePanier(${i})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr> 
        `;   
    /* "Produit : " + panier[i].name + " " + "Prix : " + panier[i].price;*/
        
    }    
}

function supprimePanier(i)
{
    panier.splice(i,1);
    let pan = JSON.stringify(panier);
    localStorage.setItem('panier', pan);
    window.location.reload();
}

function recupdonnee() 
{  
    let donnee =
    {
         pren : document.querySelector('.prenom').value,
         nom : document.querySelector('.nom').value,
         address : document.querySelector('.adresse').value,
         ville : document.querySelector('.ville').value,
         mail :  document.querySelector('.mail').value
    }  
    
    tabdonne.push(donnee);
}

function getRandomInt(max)
{
    return Math.floor(Math.random()*max);
}

function recapfinal()
{
    let recap = document.querySelector('.recap-final__numcom')
    recap.innerHTML = `  
    Nom : ${tabdonne.nom + '' + tabdonne.pren}        
    <h5>Recapitulatif de vôtre commande : ${affichePanier()}</h5>
    <h4>Numero de commande :</h4>${getRandomInt(max)}
    <h4>Montant total de vôtre commande : </h4>${(produit.price)+=price[i]}
    `;
}