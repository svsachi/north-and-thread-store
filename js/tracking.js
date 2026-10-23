// ========================================
// META PIXEL CONFIGURATION
// Base Pixel code and PageView are in each HTML page's <head>.
// Pixel ID installed: 2570376396769911
// ========================================
const META_PIXEL_ID = "2570376396769911";

// The base code queues events until Meta's script has finished loading.
function trackEvent(name, data) {
  if (typeof window.fbq === 'function') window.fbq('track', name, data || {});
}
// Meta Pixel: Every page visited. The HTML head calls PageView once.
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
