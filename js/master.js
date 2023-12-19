let title = document.querySelector("#name");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let quantity = document.querySelector("#quantity");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let tbody = document.querySelector("#tbody");
let alert = document.querySelector("#alert");


let mood = `create`;
let aux;
let action;

//  Get Total Function

let result = +price.value + +taxes.value + +ads.value - +discount.value;

function getTotal() {
  if (price.value != "") {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `Total: ${result}`;
    total.style.backgroundColor = "var(--alt-blue-color)";
  } else {
    total.innerHTML = "Total:";
    total.style.backgroundColor = "var(--blue-color)";
  }
}

//  Creat Product Function

let prodsArr = [];
// Load From Local Storage
if (localStorage.Product) {
  prodsArr = JSON.parse(localStorage.Product);
}

submit.onclick = function () {
  let prodObj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: (total.innerHTML = `${result}`),
    quantity: quantity.value,
    category: category.value.toLowerCase(),
  };

  if(taxes.value == "") {
    prodObj.taxes = 0;
  }
  if(ads.value == "") {
    prodObj.ads = 0;
  }
  if(discount.value == "") {
    prodObj.discount = 0;
  }
  //  Quantity Function
  
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    prodObj.quantity <= 100
  ) {
    if (mood === "create") {
      
      if (prodObj.quantity > 1) {
        for (let i = 0; i < prodObj.quantity; i++) {
          prodsArr.push(prodObj);
        }
      } else {
        prodsArr.push(prodObj);
      }
    } else {
      prodsArr[aux] = prodObj;
      mood = `create`;
      submit.innerHTML = `Create`;
      quantity.style.display = `block`;
    }

    // Clear Data
    clearData();
    

  }

  //  Save To Local storage
  localStorage.setItem("Product", JSON.stringify(prodsArr));
  showData();
};
//  Clear inputs Function

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "Total:";
  quantity.value = "";
  category.value = "";
}

//  Read Function

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < prodsArr.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${prodsArr[i].title}</td>
      <td>${prodsArr[i].price}</td>
      <td>${prodsArr[i].taxes}</td>
      <td>${prodsArr[i].ads}</td>
      <td>${prodsArr[i].discount}</td>
      <td>${prodsArr[i].total}</td>
      <td>${prodsArr[i].category}</td>
      <td><button onclick = "updateData(${i})" id="update">Update</button></td>
      <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }
  tbody.innerHTML = table;

  let deletBtn = document.querySelector("#deleteAll");
  if (prodsArr.length > 0) {
    deletBtn.innerHTML = `
    <button onclick = "deleteAll()">Delete All (${prodsArr.length})</button>
    `;
  } else {
    deletBtn.innerHTML = ``;
  }
}
showData();

// Delete

function deleteData(i) {
  prodsArr.splice(i, 1);
  localStorage.Product = JSON.stringify(prodsArr);
  showData();
}

function deleteAll() {
  alert.style.display = "block";
}

// Update

function updateData(i) {
  title.value = prodsArr[i].title;
  price.value = prodsArr[i].price;
  taxes.value = prodsArr[i].taxes;
  ads.value = prodsArr[i].ads;
  discount.value = prodsArr[i].discount;
  category.value = prodsArr[i].category;
  getTotal();
  quantity.style.display = `none`;
  submit.innerHTML = `Update`;
  mood = `update`;
  aux = i;
  console.log(mood);
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search Function

let searchMood;

function getSearchMood(id) {
  let search = document.querySelector("#search");

  if (id == `searchName`) {
    searchMood = `Name`;
  } else {
    searchMood = `Category`;
  }
  search.placeholder = `Search By ` + searchMood;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < prodsArr.length; i++) {
    if (searchMood == "Name") {
      if (prodsArr[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
              <td>${i + 1}</td>
              <td>${prodsArr[i].title}</td>
              <td>${prodsArr[i].price}</td>
              <td>${prodsArr[i].taxes}</td>
              <td>${prodsArr[i].ads}</td>
              <td>${prodsArr[i].discount}</td>
              <td>${prodsArr[i].total}</td>
              <td>${prodsArr[i].category}</td>
              <td><button onclick = "updateData(${i})" id="update">Update</button></td>
              <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `;
      }
    } else {
      if (prodsArr[i].category.includes(value.toLowerCase())) {
        table += `
            <tr>
              <td>${i + 1}</td>
              <td>${prodsArr[i].title}</td>
              <td>${prodsArr[i].price}</td>
              <td>${prodsArr[i].taxes}</td>
              <td>${prodsArr[i].ads}</td>
              <td>${prodsArr[i].discount}</td>
              <td>${prodsArr[i].total}</td>
              <td>${prodsArr[i].category}</td>
              <td><button onclick = "updateData(${i})" id="update">Update</button></td>
              <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `;
      }
    }
  }
  tbody.innerHTML = table;
}


//Alert Function

function getAction(id){
  if (id == "yes"){
    prodsArr = [];
    localStorage.clear();
  }
  alert.style.display = "none";
  showData();
}


