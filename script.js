//  navbar mobile res
 const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    
    // ================= API =================
const API = {
  plants: 'https://openapi.programming-hero.com/api/plants',
  categories: 'https://openapi.programming-hero.com/api/categories',
  byCategory: id => `https://openapi.programming-hero.com/api/category/${id}`,
  detail: id => `https://openapi.programming-hero.com/api/plant/${id}`
};

// ================= ELEMENTS =================
const els = {
  grid: document.getElementById('grid'),
  categoryList: document.getElementById('categoryList'),
  spinner: document.getElementById('spinner'),
  cartList: document.getElementById('cartList'),
  cartCount: document.getElementById('cartCount'),
  cartTotal: document.getElementById('cartTotal'),
  detailsModal: document.getElementById('detailsModal'),
  detailsContent: document.getElementById('detailsContent'),
  year: document.getElementById('year'),
  pledgeForm: document.getElementById('pledgeForm'),
  pledgeMsg: document.getElementById('pledgeMsg')
};

// ================= STATE =================
const cart = [];
let total = 0;

// ================= HELPERS =================
function showSpinner(state){
  els.spinner.classList.toggle('hidden', !state);
}

async function fetchJSON(url){
  try {
    showSpinner(true);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch(err){
    console.error(err);
    return null;
  } finally {
    showSpinner(false);
  }
}

function plantFields(p){
  return {
    id: p?.id || p?.plantId || p?.plant_id,
    name: p?.name || p?.plant_name || p?.tree_name || 'Mango Tree',
    image: p?.image || p?.img || p?.thumbnail || 'https://i.ibb.co.com/cSQdg7tf/mango-min.jpg',
    category: p?.category || p?.plant_category || 'General',
    price: Number(p?.price ?? p?.cost ?? 0) || 0,
    description: p?.description || p?.short_description || 'A fast-growing tropical tree that produces delicious, juicy mangoes.'
  };
}

// ================= RENDER FUNCTIONS =================
function renderPlants(arr=[]){
  els.grid.innerHTML = '';
  arr.forEach(raw => {
    const p = plantFields(raw);
    const card = document.createElement('div');
    card.className = 'card bg-white border rounded-lg overflow-hidden shadow-sm';
    card.innerHTML = `
      <figure><img src="${p.image}" alt="${p.name}" class="h-44 w-full object-cover" /></figure>
      <div class="card-body p-4">
        <a class="text-lg font-semibold hover:text-green-800 cursor-pointer name-link">${p.name}</a>
        <p class="text-sm text-slate-600 line-clamp-2">${p.description}</p>
        <div class="flex items-center justify-between text-sm mt-1">
          <span class="badge badge-ghost bg-green-100 text-green-700">${p.category}</span>
          <span class="font-semibold">$${p.price}</span>
        </div>
        <div class="card-actions mt-3">
          <button class="flex items-center justify-center w-full h-10 btn btn-sm text-white bg-green-700 hover:bg-green-600 rounded-2xl add-btn">
            Add to Cart
          </button>
        </div>
      </div>`;

    // Events
    card.querySelector('.add-btn').addEventListener('click', ()=> addToCart(p));
    card.querySelector('.name-link').addEventListener('click', ()=> openDetails(p.id));

    els.grid.appendChild(card);
  });
}

function updateCartUI(){
  els.cartList.innerHTML = '';
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = "flex items-center justify-between bg-green-50 px-2 py-1 rounded";
    li.innerHTML = `
      <div class="p-2 w-full">
        <h3 class="font-semibold text-gray-800">${item.name}</h3>
        <p class="text-gray-500">$${item.price} × 1</p>
      </div>
      <button class="text-gray-400 hover:text-red-500 text-xl" title="Remove">×</button>
    `;
    li.querySelector('button').addEventListener('click', ()=> removeFromCart(idx));
    els.cartList.appendChild(li);
  });
  els.cartCount.textContent = cart.length;
  els.cartTotal.textContent = `$${total.toFixed(2)}`;
}

// ================= CART FUNCTIONS =================
function addToCart(p){
  cart.push(p);
  total = Number((total + p.price).toFixed(2));
  updateCartUI();
}

function removeFromCart(index){
  const [rm] = cart.splice(index,1);
  total = Number((total - (rm?.price||0)).toFixed(2));
  updateCartUI();
}

// ================= DETAILS MODAL =================
async function openDetails(id){
  if(!id) return;
  const data = await fetchJSON(API.detail(id));
  const raw = data?.plant || data?.data || data; 
  const d = plantFields(raw);

  els.detailsContent.innerHTML = `
    <img src="${d.image}" alt="${d.name}" class="w-full h-64 object-cover rounded-lg">
    <div class="mt-4">
      <h3 class="text-xl font-bold">${d.name}</h3>
      <p class="mt-2 text-gray-700">${d.description}</p>
      <div class="mt-3 flex items-center gap-3">
        <span class="badge bg-green-100 text-green-700">${d.category}</span>
        <span class="font-semibold">Price: $${d.price}</span>
      </div>
      <button class="btn mt-4 bg-green-700 text-white hover:bg-green-600 rounded-2xl">Add to Cart</button>
    </div>`;

  els.detailsContent.querySelector('button').addEventListener('click', ()=> { 
    addToCart(d); 
    els.detailsModal.close(); 
  });

  els.detailsModal.showModal();
}

// ================= CATEGORY LOADING =================
async function loadCategories(){
  const res = await fetchJSON(API.categories);
  const cats = res?.categories || res?.data || [];

  // Add "All" button
  const allBtn = document.createElement('button');
  allBtn.className = 'btn btn-sm btn-outline rounded-2xl active-cat';
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => { setActive(allBtn); loadAllPlants(); });
  els.categoryList.appendChild(allBtn);

  // Add category buttons
  cats.forEach(c => {
    const id = c?.id || c?.category_id || c?.categoryId;
    const name = c?.category || c?.name || c?.title || 'Category';
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-outline rounded-2xl';
    btn.textContent = name;
    btn.dataset.id = id;
    btn.addEventListener('click', ()=> { setActive(btn); loadByCategory(id); });
    els.categoryList.appendChild(btn);
  });
}

function setActive(activeBtn){
  [...els.categoryList.children].forEach(b => b.classList.remove('active-cat'));
  activeBtn.classList.add('active-cat');
}

async function loadAllPlants(){
  const res = await fetchJSON(API.plants);
  const list = res?.plants || res?.data || [];
  renderPlants(list);
}

async function loadByCategory(id){
  const res = await fetchJSON(API.byCategory(id));
  const list = res?.plants || res?.data || [];
  renderPlants(list);
}

// ================= FORM =================
els.pledgeForm?.addEventListener('submit', e => {
  e.preventDefault();
  els.pledgeMsg.classList.remove('hidden');
  e.target.reset();
  setTimeout(()=> els.pledgeMsg.classList.add('hidden'), 3000);
});

// ================= INIT =================
(function init(){
  els.year.textContent = new Date().getFullYear();
  loadCategories();
  loadAllPlants();
})();
