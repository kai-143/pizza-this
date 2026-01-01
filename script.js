const ITEMS = [
  { name: "Margherita Pizza", price: 12, ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Mozzarella", "Pizza Cheese"] },
  { name: "Ham Pizza", price: 14, ingredients: ["Pizza Dough", "Tomato Sauce", "Pizza Cheese", "Ham", "Ham"] },
  { name: "Salami Pizza", price: 14, ingredients: ["Pizza Dough", "Tomato Sauce", "Pizza Cheese", "Salami", "Salami"] },
  { name: "Pepperoni Pizza", price: 15, ingredients: ["Pizza Dough", "Tomato Sauce", "Pizza Cheese", "Pepperoni", "Pepperoni"] },
  { name: "Vegetarian Pizza", price: 15, ingredients: ["Pizza Dough", "Tomato Sauce", "Pizza Cheese", "Olives", "Olives", "Bell Peppers", "Bell Peppers"] },
  { name: "Hawaiian Pizza", price: 16, ingredients: ["Pizza Dough", "Tomato Sauce", "Pizza Cheese", "Pineapple", "Pineapple", "Ham"] },
  { name: "Diavolo Pizza", price: 16, ingredients: ["Pizza Dough", "Tomato Sauce", "Pizza Cheese", "Pepperoni", "Jalapeno", "Black Olives"] },
  { name: "Pineapple Smoothie", price: 6, ingredients: ["Pineapple", "Pineapple", "Pineapple", "Water", "Water"] }
];

const COMBOS = [
  { name: "Classic Starter", price: 14, items: ["Margherita Pizza"] },
  { name: "Veggie Starter Supreme", price: 18, items: ["Vegetarian Pizza"] },
  { name: "Tropical Starter Feast", price: 20, items: ["Hawaiian Pizza", "Pineapple Smoothie"] },
  { name: "Large Classic Party Pack", price: 55, items: ["Margherita Pizza", "Salami Pizza", "Pepperoni Pizza"] }
];

const EMOJI_MAP = {
  "Margherita Pizza": "🍕",
  "Pepperoni Pizza": "🌶️",
  "Vegetarian Pizza": "🥬",
  "Hawaiian Pizza": "🍍",
  "Salami Pizza": "🥩",
  "Ham Pizza": "🍖",
  "Diavolo Pizza": "🔥",
  "Pineapple Smoothie": "🍹",

  "Classic Starter": "📦",
  "Veggie Starter Supreme": "📦",
  "Tropical Starter Feast": "📦",
  "Large Classic Party Pack": "📦"
};

let order = [];

const comboList = document.getElementById("comboList");
const itemList = document.getElementById("itemList");
const orderSummary = document.getElementById("orderSummary");
const totalPrice = document.getElementById("totalPrice");

const comboModal = document.getElementById("comboModal");
const itemModal = document.getElementById("itemModal");

/* MODALS */
function openComboModal() { comboModal.style.display = "flex"; }
function closeComboModal() { comboModal.style.display = "none"; }
function openItemModal() { itemModal.style.display = "flex"; }
function closeItemModal() { itemModal.style.display = "none"; }

function resolveItem(name) {
  return ITEMS.find(i => i.name === name);
}

function toggleIngredients(titleEl) {
  const ingredientsEl = titleEl.parentElement.nextElementSibling;
  ingredientsEl.style.display =
    ingredientsEl.style.display === "block" ? "none" : "block";
}

function renderIngredients(item) {
  return (
    "<ul class=\"ingredients\">" +
    item.ingredients.map(i => `<li>${i}</li>`).join("") +
    "</ul>"
  );
}

function createMenuRow({ emoji, name, price, onClick }) {
  const row = document.createElement("div");
  row.className = "menu-row";
  row.onclick = onClick;

  row.innerHTML =
    `<div class="menu-left">
      <span class="menu-emoji">${emoji}</span>
      <span class="menu-name">${name}</span>
    </div>
    <div class="menu-right">
      <span class="menu-price">$${price}</span>
      <span class="menu-radio"></span>
    </div>`;

  return row;
}

/* POPUPS */
ITEMS.forEach(item => {
  itemList.appendChild(
    createMenuRow({
      emoji: EMOJI_MAP[item.name] || "🍽️",
      name: item.name,
      price: item.price,
      onClick: () => {
        order.push({ type: "item", ...item });
        renderOrder();
      }
    })
  );
});

COMBOS.forEach(combo => {
  comboList.appendChild(
    createMenuRow({
      emoji: EMOJI_MAP[combo.name] || "📦",
      name: combo.name,
      price: combo.price,
      onClick: () => {
        order.push({
          type: "combo",
          name: combo.name,
          price: combo.price,
          items: combo.items.map(resolveItem)
        });
        renderOrder();
      }
    })
  );
});

function removeItem(index) {
  order.splice(index, 1);
  renderOrder();
}

/* ORDER SUMMARY */
function renderOrder() {
  orderSummary.innerHTML = "";
  let total = 0;

  order.forEach((item, index) => {
    total += item.price;
    const emoji = EMOJI_MAP[item.name] || (item.type === "combo" ? "📦" : "🍽️");

    const li = document.createElement("li");
    li.className = "order-item";

    li.innerHTML =
      `<div class="item-header">
        <span class="item-title" onclick="toggleIngredients(this)">
          ${emoji} ${item.name} ($${item.price})
        </span>
        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>`;

    if (item.type === "combo") {
      li.innerHTML +=
        `<ul class="ingredients">
          ${item.items.map(sub => `<li>${sub.name}</li>`).join("")}
        </ul>`;
    } else {
      li.innerHTML += renderIngredients(item);
    }

    orderSummary.appendChild(li);
  });

  totalPrice.textContent = total;
}
