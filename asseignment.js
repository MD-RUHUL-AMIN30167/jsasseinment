const addApiProduct=()=>{
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a")
    .then(response=>response.json())
    .then(data=>{
        displayProduct(data.drinks);
    })
    .catch(error=>{
        console.error("Error fetching Api:",error);
    });
    
};


const displayProduct=(products)=> {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach(product =>{
    const div=document.createElement("div");
    div.classList.add("card")
    // console.log(product)
    div.innerHTML=`
    <img src=${product.strDrinkThumb
      } alt="">
    <h3>Name:${product.strDrink}</h3>
    <h4>Category:${product.strCategory}</h4>
    <p>Instructions:${product.strInstructions?.slice(0,30)}</p>
    <button class="add-button">Add to Cart</button>
    <button class="details-button">details</button>
    `;





     // Add-to-cart button event
    // div.querySelector(".add-button").addEventListener("click", () => {
    //   const item = {
    //     name: product.strDrink,
    //     img: product.strDrinkThumb
    //   };
    //   cart.push(item);   
    //   displayCart();     
    // });

    div.querySelector(".add-button").addEventListener("click", (e) => {
  const item = {
    id: product.idDrink,       
    name: product.strDrink,
    img: product.strDrinkThumb
  };

  //  Check if already exists in cart
  const alreadyExists = cart.find(p => p.id === item.id);

  if (!alreadyExists) {
    cart.push(item);       
    displayCart();        

    //  Change button to “Already Selected”
    const button = e.target;
    button.innerText = "Already Selected";
    button.disabled = true;
    
    
  }
});

    productContainer.appendChild(div);
  });
};



document.querySelector(".search-button").addEventListener("click",()=>{
  const searchInput=document.getElementById("serchInput").value.trim();

  if(searchInput)
  {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response=>response.json())
    .then(data=>{
      const productContainer=document.getElementById("product-container")
      productContainer.innerHTML="";
      if(data.drinks){
        displayProduct(data.drinks);

      }
      else{
        productContainer.innerHTML =
        `<h2>No drinks found for "${searchInput}"</h2>`;
      }
    
       
     })
     .catch(error => {
       console.error("Error fetching Api:", error);
     });
    
  }

});


 let cart=[];
 const displayCart=()=>{
  const cartItems =document.getElementById("cart-items")
  const cartCount=document.getElementById("cart-count")
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="gap">${index + 1}</td>
      <td class="gap" ><img src="${item.img}" width="40" height="40" /></td>
      <td class="gap">${item.name}</td>
      
    `;
    cartItems.appendChild(tr);
  });
  cartCount.innerText = cart.length;

 };


addApiProduct();