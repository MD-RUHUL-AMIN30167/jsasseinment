// script.js
const drinkColumn = document.getElementById('drinkColumn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const groupList = document.getElementById('groupList');
const drinkCount = document.getElementById('drinkCount');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalInfo = document.getElementById('modalInfo');
const closeBtn = document.querySelector('.close');

let selectedDrinks = [];

// Load default drinks
window.onload = () => fetchDrink('margarita');

searchBtn.addEventListener('click', () => {
  fetchDrink(searchInput.value.trim());
});

async function fetchDrink(query) {
  drinkColumn.innerHTML = '<p>Loading...</p>';
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);

  const data = await res.json();
  console.log(data)
  const drinks = data.drinks;

  drinkColumn.innerHTML = '';
  if (!drinks) {
    drinkColumn.innerHTML = '<p>No drink found.</p>';
    return;
  }

  drinks.forEach(drink => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="drink-img" />
      <h4>Name: ${drink.strDrink}</h4>
      <p>Category: ${drink.strCategory}</p>
      <p>Instructions: ${drink.strInstructions.slice(0, 30)}...</p>
      <button class="add-btn" onclick="addToGroup('${drink.strDrink}')">Add to Cart</button>
      <button class="details-btn" onclick='showDetails(${JSON.stringify(drink)})'>Details</button>
    `;

    drinkColumn.appendChild(card);
  });
}

function addToGroup(name) {
  if (selectedDrinks.length >= 7) {
    alert('You can only add up to 7 drinks.');
    return;
  }
  if (selectedDrinks.includes(name)) return;

  selectedDrinks.push(name);
  drinkCount.textContent = selectedDrinks.length;

  const li = document.createElement('li');
  li.textContent = name;
  groupList.appendChild(li);
}

function showDetails(drink) {
  modal.style.display = 'block';
  modalTitle.textContent = drink.strDrink;
  modalInfo.innerHTML = `
    <p><strong>Category:</strong> ${drink.strCategory}</p>
    <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
    <p><strong>Glass:</strong> ${drink.strGlass}</p>
    <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
    <p><strong>Ingredients:</strong> 
     ${drink.strIngredient1 || ''},
     ${drink.strIngredient2 || ''}</p>
  `;
}

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};
