

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

    fetch("http://localhost:3000/api/cameras")
    .then( res=>res.json())
    .then( cameras => 
    {
        console.log(cameras);
        for(camera of cameras)
        {
            if(idde == camera._id){
            document.getElementById('produit').innerHTML +=`
            <div class="produit__img">
                <img src="${camera.imageUrl}" alt="mon appareil" />
            </div>
            <div class="produit__text">
            <div class="produit__name">Modèle : ${camera.name}</div>
            <div class="produit__texte">Description : ${camera.description}</div>
            <div class="produit__prix">Le prix est de : ${camera.price}</div> 
            <div class="produit__choix">
            <label>taille Objectif :</label>
            <select name="produit__select" id="">
            <option>optic 25</option>
            <option>optic 35</option>
            <option>optic 45</option>
            </select>
            </div>
            <div class="buttontwo">
                <a href="recap.html?id=${camera._id}" /><button>Ajouter au panier</button></a>
            </div>
            </div>
            `;
        }}   
    })
}
function localstor() 
{
    let params = (new URL(document.location)).searchParams;
    let iddde = params.get('id')

    fetch("http://localhost:3000/api/cameras")
    .then( res=>res.json())
    .then( cameras => 
    {
        console.log(cameras);
        for(camera of cameras)
        { 
            if(iddde == camera._id)
        {
            localStorage.setItem('nom', camera.name)
            localStorage.setItem('prix', camera.price)
            
            document.getElementById('macommande').innerHTML +=`
            <h4>Ma Commande :</h4>
            <div class="element"> 
            <div class="element__nom">Produit : ${localStorage.getItem('nom')}</div>
            <span class="element__prix">Prix : ${localStorage.getItem('prix')}</span>
            <i class="fas fa-trash-alt"></i>
            </div>
            <h4>Montant total :</h4>
            `;
        }
       }
    })
}


