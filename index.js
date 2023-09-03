let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let delete_All = document.getElementById("deleteAll");
let i;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// crate product and save it in local storage
let data_product;
if (localStorage.product != null) {
  data_product = JSON.parse(localStorage.product);
} else {
  data_product = [];
}

create.onclick = () => {
  let new_product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    new_product.count < 50
  ) {
    if (create.innerHTML === "Create") {
      // count
      if (new_product.count > 1) {
        for (let i = 0; i < new_product.count; i++) {
          data_product.push(new_product);
          clearInputs();
        }
      } else {
        data_product.push(new_product);
      }
    } else {
      data_product[i] = new_product;
      create.innerHTML = "Create";
      total.style.background = "#a00d02";
      count.style.display = "block";
      clearInputs();
    }
  }

  total.style.background = "#a00d02";

  // save in local storage
  localStorage.setItem("product", JSON.stringify(data_product));

  showData();
};
console.log(data_product);

// clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read data
function showData() {
  let table = "";
  for (let i = 0; i < data_product.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${data_product[i].title}</td>
        <td>${data_product[i].price}</td>
        <td>${data_product[i].taxes}</td>
        <td>${data_product[i].ads}</td>
        <td>${data_product[i].discount}</td>
        <td>${data_product[i].total}</td>
        <td>${data_product[i].category}</td>
        <td><button id="update" onclick="update(${i})">Update</button></td>
        <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
     </tr>
    `;
    index = i;
  }
  let tbody = (document.getElementById("tbody").innerHTML = table);
  if (data_product.length > 0) {
    delete_All.innerHTML = `<button onclick="deleteAll()">Delete All (${data_product.length})</button>`;
  } else {
    delete_All.innerHTML = "";
  }
}
showData();

// delete per unit
function deleteProduct(index) {
  data_product.splice(index, 1);
  localStorage.product = JSON.stringify(data_product);
  showData();
}

// delete all
function deleteAll() {
  data_product.splice(0);
  localStorage.clear();
  showData();
}

// update per unit
function update(index) {
  title.value = data_product[index].title;
  price.value = data_product[index].price;
  taxes.value = data_product[index].taxes;
  ads.value = data_product[index].ads;
  discount.value = data_product[index].discount;
  total.innerHTML = data_product[index].total;
  count.style.display = "none";
  category.value = data_product[index].category;
  create.innerHTML = "Update";
  getTotal();
  i = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  title.focus();
}

// search
let mood = "title";
function searchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    mood = "title";
  } else {
    mood = "category";
  }
  search.placeholder = `Search By: ${mood}`;
  search.focus();
  search.value = "";
  showData();
}

function searchElements(value) {
  let table = "";

  for (let i = 0; i < data_product.length; i++) {
    if (mood == "title") {
      if (data_product[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
          <td>${i}</td>
          <td>${data_product[i].title}</td>
          <td>${data_product[i].price}</td>
          <td>${data_product[i].taxes}</td>
          <td>${data_product[i].ads}</td>
          <td>${data_product[i].discount}</td>
          <td>${data_product[i].total}</td>
          <td>${data_product[i].category}</td>
          <td><button id="update" onclick="update(${i})">Update</button></td>
          <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
          </tr>
        `;
      }
    } else {
      if (data_product[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
          <td>${i}</td>
          <td>${data_product[i].title}</td>
          <td>${data_product[i].price}</td>
          <td>${data_product[i].taxes}</td>
          <td>${data_product[i].ads}</td>
          <td>${data_product[i].discount}</td>
          <td>${data_product[i].total}</td>
          <td>${data_product[i].category}</td>
          <td><button id="update" onclick="update(${i})">Update</button></td>
          <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
          </tr>
        `;
      }
    }
  }
  let tbody = (document.getElementById("tbody").innerHTML = table);
}
