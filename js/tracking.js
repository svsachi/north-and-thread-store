// ========================================
// META PIXEL CONFIGURATION
// Replace YOUR_PIXEL_ID with the real Pixel ID
// ========================================
const META_PIXEL_ID = "YOUR_PIXEL_ID";

// Pixel calls are disabled until a real ID is supplied. No demo data is sent.
const pixelReady = META_PIXEL_ID !== 'YOUR_PIXEL_ID' && /^\d+$/.test(META_PIXEL_ID);
if (pixelReady) {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', META_PIXEL_ID);
}
function trackEvent(name, data) {
  if (pixelReady && typeof fbq === 'function') fbq('track', name, data || {});
}
// Meta Pixel: Every page visited
function trackPageView() { trackEvent('PageView'); }
// Meta Pixel: Product viewed
function trackViewContent(product) {
  trackEvent('ViewContent', {content_name:product.name,content_ids:[product.id],content_type:'product',value:product.price,currency:'LKR'});
}
// Meta Pixel: Product added to cart
function trackAddToCart(product, quantity) {
  trackEvent('AddToCart', {content_name:product.name,content_ids:[product.id],content_type:'product',value:product.price*quantity,currency:'LKR',num_items:quantity});
}
// Meta Pixel: Checkout started
function trackInitiateCheckout(items, value) {
  trackEvent('InitiateCheckout', {content_ids:items.map(item=>item.id),content_type:'product',value,currency:'LKR',num_items:items.reduce((sum,item)=>sum+item.quantity,0)});
}
// Meta Pixel: Purchase completed
function trackPurchase(order) {
  trackEvent('Purchase', {value:order.total,currency:'LKR',order_id:order.id,content_ids:order.items.map(item=>item.id),content_type:'product',num_items:order.items.reduce((sum,item)=>sum+item.quantity,0)});
}
trackPageView();
