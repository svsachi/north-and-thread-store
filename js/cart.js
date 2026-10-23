const CART_KEY = 'north-thread-cart';
const ORDER_KEY = 'north-thread-order';
const DELIVERY_THRESHOLD = 15000;
function getCart() {
  try { const items=JSON.parse(localStorage.getItem(CART_KEY)||'[]'); return Array.isArray(items)?items.filter(i=>PRODUCTS.some(p=>p.id===i.id)&&Number.isInteger(i.quantity)&&i.quantity>0):[]; }
  catch { return []; }
}
function saveCart(items) { localStorage.setItem(CART_KEY,JSON.stringify(items)); document.dispatchEvent(new Event('cart:changed')); }
function cartCount() { return getCart().reduce((sum,item)=>sum+item.quantity,0); }
function cartSubtotal() { return getCart().reduce((sum,item)=>sum+(PRODUCTS.find(p=>p.id===item.id)?.price||0)*item.quantity,0); }
function deliveryCost(subtotal, method='standard') { return method==='express'?1200:(subtotal>=DELIVERY_THRESHOLD?0:650); }
function addToCart(product, size, color, quantity=1) {
  const items=getCart(); const match=items.find(i=>i.id===product.id&&i.size===size&&i.color===color);
  if(match) match.quantity+=quantity; else items.push({id:product.id,size,color,quantity});
  saveCart(items); trackAddToCart(product,quantity);
}
function changeCartQuantity(index, delta) {
  const items=getCart(); if(!items[index]) return;
  items[index].quantity+=delta; if(items[index].quantity<=0) items.splice(index,1);
  saveCart(items);
}
function removeFromCart(index) { const items=getCart(); items.splice(index,1); saveCart(items); }
function renderCartPage() {
  const target=document.querySelector('#cart-items'); if(!target)return;
  const items=getCart(), subtotal=cartSubtotal();
  if(!items.length){target.innerHTML='<div class="empty-state"><h2>Your bag is empty</h2><p>Find something you love in the collection.</p><a class="button button-dark" href="shop.html">EXPLORE THE SHOP</a></div>';document.querySelector('#cart-summary').hidden=true;return;}
  document.querySelector('#cart-summary').hidden=false;
  target.innerHTML=items.map((item,index)=>{const p=PRODUCTS.find(x=>x.id===item.id);return `<article class="cart-item"><a href="product.html?id=${p.id}"><img src="${productImage(p)}" alt="${p.name}" width="140" height="140"></a><div class="cart-item-details"><a class="product-name" href="product.html?id=${p.id}">${p.name}</a><span>Size: ${item.size} · Colour: ${item.color}</span><span>Unit price: ${money(p.price)}</span><div class="qty-control"><button type="button" data-cart-action="decrease" data-index="${index}" aria-label="Decrease ${p.name} quantity">−</button><span>${item.quantity}</span><button type="button" data-cart-action="increase" data-index="${index}" aria-label="Increase ${p.name} quantity">+</button></div><button class="text-link remove-link" type="button" data-cart-action="remove" data-index="${index}">REMOVE</button></div><strong>${money(p.price*item.quantity)}</strong></article>`;}).join('');
  document.querySelector('#cart-subtotal').textContent=money(subtotal);document.querySelector('#cart-delivery').textContent=deliveryCost(subtotal)?money(deliveryCost(subtotal)):'FREE';document.querySelector('#cart-total').textContent=money(subtotal+deliveryCost(subtotal));
  document.querySelector('#delivery-note').textContent=subtotal>=DELIVERY_THRESHOLD?'You qualify for free standard delivery.':`Add ${money(DELIVERY_THRESHOLD-subtotal)} for free standard delivery.`;
}
function renderCheckoutPage(){const target=document.querySelector('#checkout-items');if(!target)return;const items=getCart();if(!items.length){location.replace('cart.html');return;}const subtotal=cartSubtotal(),method=document.querySelector('input[name="delivery-method"]:checked').value,delivery=deliveryCost(subtotal,method);target.innerHTML=items.map(item=>{const p=PRODUCTS.find(x=>x.id===item.id);return `<div class="checkout-item"><img src="${productImage(p)}" alt="${p.name}" width="62" height="62"><div><strong>${p.name}</strong><small>${item.color} / ${item.size} · Qty ${item.quantity}</small></div><span>${money(p.price*item.quantity)}</span></div>`;}).join('');document.querySelector('#checkout-subtotal').textContent=money(subtotal);document.querySelector('#checkout-delivery').textContent=delivery?money(delivery):'FREE';document.querySelector('#checkout-total').textContent=money(subtotal+delivery);}
function initCartAndCheckout(){const page=document.body.dataset.page;if(page==='cart'){renderCartPage();document.querySelector('#cart-items').addEventListener('click',e=>{const btn=e.target.closest('[data-cart-action]');if(!btn)return;const index=Number(btn.dataset.index);if(btn.dataset.cartAction==='remove')removeFromCart(index);else changeCartQuantity(index,btn.dataset.cartAction==='increase'?1:-1);renderCartPage();});}if(page==='checkout'){if(!getCart().length){location.replace('cart.html');return;}renderCheckoutPage();const items=getCart();trackInitiateCheckout(items,cartSubtotal());document.querySelectorAll('input[name="delivery-method"]').forEach(el=>el.addEventListener('change',renderCheckoutPage));document.querySelector('#checkout-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const subtotal=cartSubtotal(),method=data.get('delivery-method');const order={id:`NT-${Date.now().toString(36).toUpperCase()}`,name:String(data.get('full-name')).trim(),deliveryMethod:method,items:getCart(),subtotal,delivery:deliveryCost(subtotal,method),total:subtotal+deliveryCost(subtotal,method),createdAt:new Date().toISOString()};localStorage.setItem(ORDER_KEY,JSON.stringify(order));saveCart([]);location.href='success.html';});}if(page==='success'){let order;try{order=JSON.parse(localStorage.getItem(ORDER_KEY)||'null');}catch{order=null;}if(order&&Array.isArray(order.items)){document.querySelector('#success-order').textContent=order.id;document.querySelector('#success-name').textContent=order.name;document.querySelector('#success-total').textContent=money(order.total);const trackedKey=`north-thread-tracked-${order.id}`;if(!localStorage.getItem(trackedKey)){trackPurchase(order);localStorage.setItem(trackedKey,'1');}}else{document.querySelector('#success-details').hidden=true;document.querySelector('#success-message').textContent='There is no recent demo order in this browser.';}}}
document.addEventListener('DOMContentLoaded',initCartAndCheckout);
