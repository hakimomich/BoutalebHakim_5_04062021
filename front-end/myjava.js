
let produit;
let panier = [];
let contact = [];

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
    let somme = 0;
    let prod = document.getElementById('commandes')
    let totalpan = document.getElementById('totalpanier')

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
        totalpan.innerHTML = `
    <tr>
        <th>Total du panier :</th>
        <th>     
             ${somme = somme + panier[i].price/100} &euro;           
        </th>
        <th></th>
    </tr>
         `; 
    }  
}

function supprimePanier(i)
{
    panier.splice(i,1);
    let pan = JSON.stringify(panier);
    localStorage.setItem('panier', pan);
    window.location.reload();
}

function videPanier() 
{
    localStorage.removeItem('panier');
    window.location.reload();

}

let products =[];
function sendData()
{
    
    event.preventDefault();

    let contact = { 
        firstName: document.querySelector('.prenom').value,
        lastName: document.querySelector('.nom').value,
        address: document.querySelector('.adresse').value,
        city: document.querySelector('.ville').value,
        email: document.querySelector('.mail').value
    };

    

    for( prod of panier)
    { 
        let proud = prod._id;
        products.push(proud);
    }
    
    fetch("http://localhost:3000/api/cameras/order", {
        method:'POST',
        headers: {
            'Accept': 'application/Json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            contact: contact,
            products: products
        })

    })
    .then(res=>res.json())
    .then( data =>{
        console.log(data);
        window.location.href = `recapfinal.html?id=${data.orderId}&total=${document.querySelector('#totalpanier').innerHTML}`; 
    })

}


function recapfinal()
{    
    let params = (new URL (document.location)).searchParams;
    let idf = params.get('id');
    let tot = params.get('total');
   
    let recap = document.querySelector('.recap-final__numcom')
    
    recap.innerHTML += `  
    <h5>Recapitulatif de vôtre commande : </h5>
    <h4>Numero de commande: ${idf}</h4>
    <h4> montant total : ${tot}</h4>
    `;   
}

