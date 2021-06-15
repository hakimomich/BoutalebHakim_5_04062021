

function getcam()
{
    fetch("http://localhost:3000/api/cameras")
    .then( res=>res.json())
    .then( data => 
    {
        console.log(cameras);
    }
}

const bouton = document.getElementsByClassName('bund__legend__button');
bouton.addEventListener('click', function () {
    const imgprod = document.getElementsByClassName('produit__img');
    const myimg = document.createElement('img');
    imgprod.appendChild(myimg);
    myimg.setAttribute('src', )
    myimg.setAttribute('alt', )
    myimg.setAttribute('title', )
})


