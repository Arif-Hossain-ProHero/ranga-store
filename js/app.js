const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    // rating
    let percentage = (product.rating.rate / 5) * 100;
    const starPercentage = percentage + "%"
    // create dom
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <div id="stars-inner" class="stars-outer">
        <div style="width:${starPercentage}" class="stars-inner"></div>
      </div>
      <span>${product.rating.count} ratings</span>
      <h3>Price: $ ${product.price}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
      <button id="details-btn" onclick="getDetails(${product.id})" class="btn btn-primary">Details</button></div>
      `;
    
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//-------------------get single product details-------------------//
const getDetails = id => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data));
}
// single product UI show
showDetails = data => {
  console.log(data);
  // rating
  let percentage = (data.rating.rate / 5) * 100;
  const starPercentage = percentage + "%"
  const allProducts = document.getElementById('all-products');
  allProducts.innerHTML = "";
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="card my-4" style="max-width: 70%;">
  <div class="row g-0">
    <div class="col-md-4 pe-4">
      <img src="${data.image}" class="img-fluid rounded-start" alt="product">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p>Category: ${data.category}</p>
      <div id="stars-inner" class="stars-outer">
        <div style="width:${starPercentage}" class="stars-inner"></div>
      </div>
      <span>${data.rating.count} ratings</span>
      <h3>Price: $ ${data.price}</h3>
        <p class="card-text"><span class="fs-5 fw-bold">Description: </span>${data.description}</p>
        <button onclick="addToCart(${data.id},${data.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
      </div>
    </div>
  </div>
</div>
  `;
  main.appendChild(div);
}