// produit = id produit séléctionné .split sépare en array "?id=" et l'id  et .join supprime "?id=" du tableau
const produit = window.location.search.split("?id=").join("");

// stockage eletments des produits
let produitData = [];


// on donne a propduitData la valeur de la promise et on stock nos elements dans le tableau produitData
const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products/${produit}`).then((res)=> 
        res.json(),
    ).then((promise) => {
        produitData = promise;
    });
};


// fonction servant a l'affichage dynamique du produit séléctionné en fonction de son id 
const produitDisplay = async () => {
    await fetchProduit();

    document.getElementById("title").innerHTML = `
    <h1 id="title">${produitData.name}</h1>
    `
    document.getElementById("price").innerHTML = `
    <span id="price">${produitData.price}</span>
    `

    document.getElementById("item-img").innerHTML =`
    <img src="${produitData.imageUrl}" alt="${produitData.altTxt}">
    `

    document.getElementById("description").innerHTML =`
    <p id="description">${produitData.description}</p>
    `

    // allColors est une variable qui récupere l'html de id colors
    let allColors = document.getElementById("colors");
    
    // appel d'une fonction pour chaque couleur du produit (une boucle)
    produitData.colors.forEach((colors) => {
        // tagOption est la variable contenant le html d'une option de couleur
        let tagOption = document.createElement("option");
        // on crée pour chaque couleur de la liste une option 
        tagOption.innerHTML = `${colors}`;
        tagOption.value = `${colors}`;

        // placement des balises option créés dans la variable tagOption
        allColors.appendChild(tagOption);
    });
    addBasket(produitData);
};

produitDisplay();

// creation fonction addBasket pour ajouter les produits au local storage
const addBasket = () => {
    // variable bouton contient html de l'id addToCart
    let bouton = document.getElementById("addToCart");
    // click sur bouton active la fonction suivante
    bouton.addEventListener("click", () => {
        // recuperation de ce qu'il y a dans le local storage avec la variable produitTableau
        // analyse de la chaine de caractere produit et copnstruction d'un objet 
        let produitTableau =JSON.parse(localStorage.getItem("produit"));
        // select a pour valeur la totalité des couleurs (balise select avec id colors)
        let select = document.getElementById("colors");
         // input a pour valeur la quantité - (balise input avec id quantity)
        let input = document.getElementById("quantity");

        // constante étant objet fils de la fusion du tableau produitData et de la récuperation de la couleur et de la quantité
        const fusionProductColor = Object.assign({} , produitData, {
            colors : `${select.value}`,
            quantity: `${input.value}`
        });

        // si local storage vide et click sur panier alors :
        if(produitTableau == null) {
            // produitTableau devient un array vide (tableau)
            produitTableau = [];
            // produitTableau prend la valeur de fusionProductColor (produit data + couleur + quantité)
            produitTableau.push(fusionProductColor);
            // creation de "produit" et transformation en string pour stockage dans le local storage de produitTableau
            localStorage.setItem("produit", JSON.stringify(produitTableau));
            console.log("init produit")
        }
        // si produitTableau non nul alors :
        else if (produitTableau != null) {
            // definition constante productFind
            const productFind = produitTableau.find(
                (el) => el._id == produitData._id && el.colors ==select.value);
                // si l'id dans le local storage est le meme que celui ajouté et la teinte est la meme alors : 
                if(productFind) {
                    let newQuantity = parseInt(input.value) + parseInt(productFind.quantity);
                    productFind.quantity = newQuantity;
                    localStorage.setItem("produit", JSON.stringify(produitTableau)),
                    produitTableau = JSON.parse(localStorage.getItem("produit"))
                }
                // pour tout autre possibilité :
                else {
                    produitTableau.push(fusionProductColor);
                    // creation de "produit" et transformation en string pour stockage dans le local storage de produitTableau
                    localStorage.setItem("produit", JSON.stringify(produitTableau)),
                    (produitTableau = JSON.parse(localStorage.getItem("produit")))
                }
            };
    });
    // la fonction retournera toujours produitTableau
    return produitTableau = JSON.parse(localStorage.getItem("produit"));
};