// recuperation de ce qu'il y a dans le local storage avec la variable addProduct
// analyse de la chaine de caractere produit et copnstruction d'un objet (addProduct)
let addProduct =JSON.parse(localStorage.getItem("produit"));

if(addProduct){


    ProduitEnregistrelocalstrorage = JSON.parse(localStorage.getItem("produit"));
    alert(JSON.stringify(ProduitEnregistrelocalstrorage))

    let arrayQuantity = [];
    let arrayPrice = [];
    // On crée les fiches produits dans le panier
    for (var i = 0; i < ProduitEnregistrelocalstrorage.length; i++) {
      alert(ProduitEnregistrelocalstrorage[i].id_Produit)
        let productArticle = document.createElement("article");
        document.getElementById("cart__items").appendChild(productArticle);
        productArticle.dataset.id = ProduitEnregistrelocalstrorage[i].id_Produit;
        productArticle.classList.add("cart__item");

        let productCardItemImg = document.createElement("div");
        productArticle.appendChild(productCardItemImg);
        productCardItemImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        productCardItemImg.appendChild(productImg);
        productImg.src = ProduitEnregistrelocalstrorage[i].Produit_img;
        productImg.alt = ProduitEnregistrelocalstrorage[i].Produit_alt;

        let cartItemContent = document.createElement("div");
        productArticle.appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");

        let carItemContentTitlePrice = document.createElement("div");
        cartItemContent.appendChild(carItemContentTitlePrice);
        carItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

        let ProductName = document.createElement("h2");
        carItemContentTitlePrice.appendChild(ProductName);
        ProductName.innerHTML = ProduitEnregistrelocalstrorage[i].nomProduit;

        let ProductPrice = document.createElement("p");
        carItemContentTitlePrice.appendChild(ProductPrice);
        ProductPrice.innerHTML = ProduitEnregistrelocalstrorage[i].prix + " €";

        let carItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(carItemContentSettings);
        carItemContentSettings.classList.add("cart__item__content__settings");

        let carItemContentSettingsQuantity = document.createElement("div");
        carItemContentSettings.appendChild(carItemContentSettingsQuantity);
        carItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

        let Quantité = document.createElement("p");
        carItemContentSettingsQuantity.appendChild(Quantité);
        Quantité.innerHTML = "Qté : ";

        let itemQuantity = document.createElement("input");
        carItemContentSettingsQuantity.appendChild(itemQuantity);
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.type = "number";
        itemQuantity.name = "itemQuantity";
        itemQuantity.min = "1";
        itemQuantity.max = "100";
        itemQuantity.value = ProduitEnregistrelocalstrorage[i].quantité;

        let carItemContentSettingsDelete = document.createElement("div");
        carItemContentSettings.appendChild(carItemContentSettingsDelete);
        carItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

        let buttonDelete = document.createElement("p");
        carItemContentSettingsDelete.appendChild(buttonDelete);
        buttonDelete.classList.add("deleteItem");
        buttonDelete.innerHTML = "Supprimer";

        arrayQuantity.push(parseInt(ProduitEnregistrelocalstrorage[i].quantité));
      
        //quantité d'articles dans le panier et prix total
        totalQuantité = arrayQuantity.reduce(function (a, b) {
            return a + b;
        });

        arrayPrice.push(
            parseInt(ProduitEnregistrelocalstrorage[i].prix) *
            parseInt(ProduitEnregistrelocalstrorage[i].quantité)
        );

        totalPrix = arrayPrice.reduce(function (a, b) {
            return a + b;
        });

        let totalQuantity = document.getElementById("totalQuantity");
        totalQuantity.innerHTML = totalQuantité;
        let totalPrice = document.getElementById("totalPrice");
        totalPrice.innerHTML = totalPrix;

        // Supprimer un element
        supprimerSelection = Array.from(document.querySelectorAll(".deleteItem"));
        let tab = [];
        for (let i = 0; i < supprimerSelection.length; i++) {
            supprimerSelection[i].addEventListener("click", () => {
            tab = ProduitEnregistrelocalstrorage;
            tab.splice([i], 1);
            console.log(tab);

            ProduitEnregistrelocalstrorage = localStorage.setItem(
                "produit",
                JSON.stringify(tab)
            );

            window.location.href = "cart.html";
            });
        }

        // Changer la quantité
        itemQuantity.addEventListener("change", function () {
          alert("modif qtite")
            let r2 = itemQuantity.closest("article");
            console.log(r2.getAttribute("data-id"));
            dom_id = r2.getAttribute("data-id");

            for (let k = 0; k < ProduitEnregistrelocalstrorage.length; k++) {
            const produit = ProduitEnregistrelocalstrorage[k];
            console.log(produit.quantité);
            console.log(produit.id_Produit);
                if (dom_id == produit.id_Produit) {
                produit.quantité = itemQuantity.value;

                newQuantity = JSON.stringify(ProduitEnregistrelocalstrorage);
                localStorage.setItem("produit", newQuantity);

                window.location.href = "cart.html";
                }
            }
        });

    

   
     
    }
}
