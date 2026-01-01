// force redeploy
/* ===================== MENU DATA ===================== */

const ITEMS = [
  { name: "Margherita Pizza", price: 110 },
  { name: "Ham Pizza", price: 110 },
  { name: "Salami Pizza", price: 110 },
  { name: "Pepperoni Pizza", price: 110 },
  { name: "Vegetarian Pizza", price: 120 },
  { name: "Hawaiian Pizza", price: 100 },
  { name: "Diavola Pizza", price: 130 },
  { name: "Bread Sticks", price: 50 },

  { name: "Water", price: 10 },
  { name: "Koka", price: 25 },
  { name: "Frezzi", price: 25 },
  { name: "Sprunk", price: 25 },
  { name: "Tanga", price: 25 },
  { name: "Beer", price: 30 },
  { name: "Kopri Sip", price: 30 },
  { name: "Green Apple", price: 45 },
  { name: "Pineapple Smoothie", price: 60 }
];

const COMBOS = [
  { name: "Classic Starter", price: 110, items: ["Margherita Pizza"] },
  { name: "Veggie Starter Supreme", price: 120, items: ["Vegetarian Pizza"] },
  { name: "Tropical Starter Feast", price: 160, items: ["Hawaiian Pizza", "Pineapple Smoothie"] },
  { name: "Large Classic Party Pack", price: 330, items: ["Margherita Pizza", "Salami Pizza", "Pepperoni Pizza"] }
];

/* ===================== EMOJIS ===================== */

const EMOJI_MAP = {
  "Margherita Pizza": "🍕",
  "Ham Pizza": "🍕",
  "Salami Pizza": "🍕",
  "Pepperoni Pizza": "🍕",
  "Vegetarian Pizza": "🥬",
  "Hawaiian Pizza": "🍍",
  "Diavola Pizza": "🔥",
  "Bread Sticks": "🥖",

  "Water": "💧",
  "Koka": "🥤",
  "Frezzi": "🥤",
  "Sprunk": "🥤",
  "Tanga": "🥤",
  "Beer": "🍺",
  "Kopri Sip": "🥤",
  "Green Apple": "🍏",
  "Pineapple Smoothie": "🍹",

  "Classic Starter": "🧺",
  "Veggie Starter Supreme": "🧺",
  "Tropical Starter Feast": "🧺",
  "Large Classic Party Pack": "🧺"
};

/* ===================== RECIPES ===================== */

const RECIPES = {
  "Pizza Dough": [
    "1x Olive Oil",
    "1x Yeast Packet",
    "1x Flour"
  ],

  "Bread Sticks": [
    "1x Pizza Dough"
  ],

  "Margherita Pizza": [
    "1x Pizza Dough",
    "1x Tomato Sauce",
    "2x Mozzarella",
    "1x Pizza Cheese"
  ],

  "Ham Pizza": [
    "1x Pizza Dough",
    "1x Tomato Sauce",
    "1x Pizza Cheese",
    "2x Ham"
  ],

  "Salami Pizza": [
    "1x Pizza Dough",
    "1x Tomato Sauce",
    "1x Pizza Cheese",
    "2x Salami"
  ],

  "Pepperoni Pizza": [
    "1x Pizza Dough",
    "1x Tomato Sauce",
    "1x Pizza Cheese",
    "2x Pepperoni"
  ],

  "Vegetarian Pizza": [
    "1x Pizza Dough",
    "1x Tomato Sauce",
    "1x Pizza Cheese",
    "2x Olives",
    "2x Bell Peppers"
  ],

  "Hawaiian Pizza": [
    "1x Pizza Dough",
    "1x Tomato Sauce",
    "1x Pizza Cheese",
    "2x Pineapple",
    "1x Ham"
  ],

  "Diavola Pizza": [
    "1x Pizza Dough",
    "1x Tomato Sauce",
    "1x Pizza Cheese",
    "1x Pepperoni",
    "1x Jalapeno",
    "1x Black Olives"
  ],

  "Pineapple Smoothie": [
    "3x Pineapple",
    "2x Water"
  ]
};

/* ===================== CORE ===================== */

let order = [];

const comboList = document.getElementById("comboList");
const itemList = document.getElementById("itemList");
const orderSummary = document.getElementById("orderSummary");
const totalPrice = document.getElementById("totalPrice");

const comboModal = document.getElementById("comboModal");
const itemModal = document.getElementById("itemModal");

function openComboModal() { comboModal.style.display = "flex"; }
function closeComboModal() { comboModal.style.display = "none"; }
function openItemModal() { itemModal.style.display = "flex"; }
function closeItemModal() { itemModal.style.display = "none"; }

function toggleIngredients(el) {
  const block = el.parentElement.nextElementSibling;
  block.style.display = block.style.display === "block" ? "none" : "block";
}

function toggleSubIngredients(el) {
  const block = el.nextElementSibling;
  block.style.display = block.style.display === "block" ? "none" : "block";
}

/* ===================== RECIPE RENDERING ===================== */

function renderRecipeList(name) {
  const recipe = RECIPES[name];
  if (!recipe) return "";

  return recipe.map(line => {
    const itemName = line.split(" ").slice(1).join(" ");
    return `
      <li>${line}
        ${RECIPES[itemName]
          ? `<ul>${renderRecipeList(itemName)}</ul>`
          : ""}
      </li>`;
  }).join("");
}

function renderItemIngredients(name) {
  return `
    <div class="ingredients">
      <strong>📝 Ingredients</strong>
      <ul>
        ${renderRecipeList(name)}
      </ul>
    </div>
  `;
}


function renderComboBlock(combo) {
  return `
    <div class="ingredients">
      <strong>Items</strong>
      <ul>
        ${combo.items.map(itemName => `
          <li>
            <span style="cursor:pointer;" onclick="toggleSubIngredients(this)">
              ${itemName}
            </span>
            <div style="display:none; margin-left:12px;">
              <strong>📝 Ingredients</strong>
              <ul>
                ${renderRecipeList(itemName)}
              </ul>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}


/* ===================== MENU LIST ===================== */

function createMenuRow({ name, price }) {
  const row = document.createElement("div");
  row.className = "menu-row";

  row.innerHTML = `
    <div class="menu-left">
      <span class="menu-emoji">${EMOJI_MAP[name] || "🍽️"}</span>
      <span class="menu-name">${name}</span>
    </div>
    <div class="menu-right">
      <span class="menu-price">$${price}</span>
      <span class="menu-radio"></span>
    </div>
  `;

  return row;
}

ITEMS.forEach(item => {
  const row = createMenuRow(item);
  row.onclick = () => {
    row.classList.toggle("selected");
    order.push({ type: "item", ...item });
    renderOrder();
  };
  itemList.appendChild(row);
});

COMBOS.forEach(combo => {
  const row = createMenuRow(combo);
  row.onclick = () => {
    row.classList.toggle("selected");
    order.push({ type: "combo", ...combo });
    renderOrder();
  };
  comboList.appendChild(row);
});

/* ===================== ORDER SUMMARY ===================== */

function removeItem(index) {
  order.splice(index, 1);
  renderOrder();
}

function renderOrder() {
  orderSummary.innerHTML = "";
  let total = 0;

  order.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.className = "order-item";

    li.innerHTML = `
      <div class="item-header">
        <span class="item-title" onclick="toggleIngredients(this)">
          ${EMOJI_MAP[item.name] || ""} ${item.name} ($${item.price})
        </span>
        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
      ${item.type === "combo"
        ? renderComboBlock(item)
        : renderItemIngredients(item.name)}
    `;

    orderSummary.appendChild(li);
  });

  totalPrice.textContent = total;
}
