// Demo catalog. Prices are in Sri Lankan rupees.
const PRODUCTS = [
  {id:'nt-001',name:'Essential Oversized T-Shirt',price:4990,oldPrice:5990,category:'T-Shirts',gender:'Men',color:'Ecru',colors:['Ecru','Black'],image:1,tag:'BEST SELLER',date:12,description:'A relaxed everyday staple with a generous fit and a soft, structured feel.'},
  {id:'nt-002',name:'Premium Heavyweight Tee',price:5490,category:'T-Shirts',gender:'Men',color:'Charcoal',colors:['Charcoal','Ecru'],image:2,tag:'NEW',date:11,description:'Substantial cotton jersey and an easy silhouette, made for repeat wear.'},
  {id:'nt-003',name:'Relaxed Fit Graphic T-Shirt',price:4590,oldPrice:5490,category:'T-Shirts',gender:'Men',color:'Olive',colors:['Olive'],image:3,tag:'SALE',date:10,description:'A relaxed tee with a quiet graphic detail for effortless off-duty style.'},
  {id:'nt-004',name:'Classic Everyday Tee',price:3990,category:'T-Shirts',gender:'Men',color:'White',colors:['White','Black'],image:4,tag:'',date:9,description:'A clean, dependable tee cut for comfort through the day.'},
  {id:'nt-005',name:'Everyday Pullover Hoodie',price:7990,oldPrice:8990,category:'Hoodies',gender:'Women',color:'Slate Blue',colors:['Slate Blue','Black'],image:5,tag:'BEST SELLER',date:8,description:'Soft brushed fleece, a roomy hood, and comfort that goes everywhere.'},
  {id:'nt-006',name:'Premium Zip Hoodie',price:8490,category:'Hoodies',gender:'Men',color:'Sand',colors:['Sand','Charcoal'],image:6,tag:'NEW',date:7,description:'An easy zip layer with a relaxed fit and considered everyday details.'},
  {id:'nt-007',name:'Relaxed Fit Sweatshirt',price:6990,category:'Sweatshirts',gender:'Women',color:'Heather Grey',colors:['Heather Grey','Taupe'],image:7,tag:'',date:6,description:'A softly structured crewneck that works with just about anything.'},
  {id:'nt-008',name:"Essential Women's Crop Tee",price:4290,oldPrice:4990,category:'T-Shirts',gender:'Women',color:'Black',colors:['Black','White'],image:8,tag:'SALE',date:5,description:'A simple cropped silhouette with a comfortable, everyday fit.'},
  {id:'nt-009',name:"Women's Oversized Tee",price:4790,category:'T-Shirts',gender:'Women',color:'Ecru',colors:['Ecru','Olive'],image:9,tag:'NEW',date:4,description:'A roomy shape and soft hand feel for a laid-back uniform.'},
  {id:'nt-010',name:'Unisex Essential Hoodie',price:7490,oldPrice:8990,category:'Hoodies',gender:'Unisex',color:'Black',colors:['Black','Sand'],image:10,tag:'SALE',date:3,description:'A versatile fleece hoodie with a comfortably oversized profile.'},
  {id:'nt-011',name:'Minimal Crewneck Sweatshirt',price:6490,category:'Sweatshirts',gender:'Unisex',color:'Taupe',colors:['Taupe','Heather Grey'],image:11,tag:'',date:2,description:'A clean crewneck in a versatile neutral, designed to layer with ease.'},
  {id:'nt-012',name:'Premium Everyday Tee',price:5290,category:'T-Shirts',gender:'Men',color:'Dusty Blue',colors:['Dusty Blue','White'],image:12,tag:'NEW',date:1,description:'A refined everyday tee with a smooth, breathable feel.'}
];
const productImage = product => `images/products/product-${String(product.image).padStart(2,'0')}.webp`;
const money = amount => `Rs. ${Number(amount).toLocaleString('en-LK')}`;
const discount = product => product.oldPrice ? Math.round((1-product.price/product.oldPrice)*100) : 0;
