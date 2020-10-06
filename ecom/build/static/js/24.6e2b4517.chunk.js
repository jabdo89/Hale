(this["webpackJsonpflone-react"]=this["webpackJsonpflone-react"]||[]).push([[24],{981:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(174),r=a(261),i=a(854),m=a.n(i),s=a(260),o=a(84),d=a(847),u=a(131),E=a(101),p=a(851),b=a(850);t.default=Object(o.connect)((function(e){return{cartItems:e.cartData,wishlistItems:e.wishlistData,currency:e.currencyData}}),(function(e){return{addToCart:function(t,a,n){e(Object(E.e)(t,a,n))},addToWishlist:function(t,a,n){e(Object(u.d)(t,a,n))},deleteFromWishlist:function(t,a,n){e(Object(u.f)(t,a,n))},deleteAllFromWishlist:function(t){e(Object(u.e)(t))}}}))((function(e){var t=e.location,a=e.cartItems,i=e.currency,o=e.addToCart,u=e.wishlistItems,E=e.deleteFromWishlist,h=e.deleteAllFromWishlist,f=Object(r.useToasts)().addToast,N=t.pathname;return c.a.createElement(n.Fragment,null,c.a.createElement(m.a,null,c.a.createElement("title",null,"Flone | Wishlist"),c.a.createElement("meta",{name:"description",content:"Wishlist page of flone react minimalist eCommerce template."})),c.a.createElement(s.BreadcrumbsItem,{to:"/"},"Home"),c.a.createElement(s.BreadcrumbsItem,{to:""+N},"Wishlist"),c.a.createElement(p.a,{headerTop:"visible"},c.a.createElement(b.a,null),c.a.createElement("div",{className:"cart-main-area pt-90 pb-100"},c.a.createElement("div",{className:"container"},u&&u.length>=1?c.a.createElement(n.Fragment,null,c.a.createElement("h3",{className:"cart-page-title"},"Your wishlist items"),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement("div",{className:"table-content table-responsive cart-table-content"},c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Image"),c.a.createElement("th",null,"Product Name"),c.a.createElement("th",null,"Unit Price"),c.a.createElement("th",null,"Add To Cart"),c.a.createElement("th",null,"action"))),c.a.createElement("tbody",null,u.map((function(e,t){var r=Object(d.a)(e.price,e.discount),m=(e.price*i.currencyRate).toFixed(2),s=(r*i.currencyRate).toFixed(2),u=a.filter((function(t){return t.id===e.id}))[0];return c.a.createElement("tr",{key:t},c.a.createElement("td",{className:"product-thumbnail"},c.a.createElement(l.b,{to:"/product/"+e.id},c.a.createElement("img",{className:"img-fluid",src:""+e.image[0],alt:""}))),c.a.createElement("td",{className:"product-name text-center"},c.a.createElement(l.b,{to:"/product/"+e.id},e.name)),c.a.createElement("td",{className:"product-price-cart"},null!==r?c.a.createElement(n.Fragment,null,c.a.createElement("span",{className:"amount old"},i.currencySymbol+m),c.a.createElement("span",{className:"amount"},i.currencySymbol+s)):c.a.createElement("span",{className:"amount"},i.currencySymbol+m)),c.a.createElement("td",{className:"product-wishlist-cart"},e.affiliateLink?c.a.createElement("a",{href:e.affiliateLink,rel:"noopener noreferrer",target:"_blank"}," ","Buy now"," "):e.variation&&e.variation.length>=1?c.a.createElement(l.b,{to:"".concat("","/product/").concat(e.id)},"Select option"):e.stock&&e.stock>0?c.a.createElement("button",{onClick:function(){return o(e,f)},className:void 0!==u&&u.quantity>0?"active":"",disabled:void 0!==u&&u.quantity>0,title:void 0!==e?"Added to cart":"Add to cart"},void 0!==u&&u.quantity>0?"Added":"Add to cart"):c.a.createElement("button",{disabled:!0,className:"active"},"Out of stock")),c.a.createElement("td",{className:"product-remove"},c.a.createElement("button",{onClick:function(){return E(e,f)}},c.a.createElement("i",{className:"fa fa-times"}))))}))))))),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("div",{className:"cart-shiping-update-wrapper"},c.a.createElement("div",{className:"cart-shiping-update"},c.a.createElement(l.b,{to:"/shop-grid-standard"},"Continue Shopping")),c.a.createElement("div",{className:"cart-clear"},c.a.createElement("button",{onClick:function(){return h(f)}},"Clear Wishlist")))))):c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("div",{className:"item-empty-area text-center"},c.a.createElement("div",{className:"item-empty-area__icon mb-30"},c.a.createElement("i",{className:"pe-7s-like"})),c.a.createElement("div",{className:"item-empty-area__text"},"No items found in wishlist ",c.a.createElement("br",null)," ",c.a.createElement(l.b,{to:"/shop-grid-standard"},"Add Items")))))))))}))}}]);
//# sourceMappingURL=24.6e2b4517.chunk.js.map