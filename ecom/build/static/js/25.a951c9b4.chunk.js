(this["webpackJsonpflone-react"]=this["webpackJsonpflone-react"]||[]).push([[25],{982:function(e,t,a){"use strict";a.r(t);var c=a(848),l=a(0),r=a.n(l),n=a(174),m=a(261),o=a(854),s=a.n(o),u=a(85),i=a(61),d=a(260),E=a(84),p=a(847),b=a(101),y=a(851),N=a(850);t.default=Object(i.compose)(Object(E.connect)((function(e,t){var a=t.match.params.id;console.log(a);var c=e.firestore.data.Orders;return console.log(c),{cartItems:c[a]?c[a].items:null,currency:e.currencyData}}),(function(e){return{addToCart:function(t,a,c){e(Object(b.e)(t,a,c))},decreaseQuantity:function(t,a){e(Object(b.g)(t,a))},deleteFromCart:function(t,a){e(Object(b.i)(t,a))},deleteAllFromCart:function(t){e(Object(b.h)(t))}}})),Object(u.firestoreConnect)([{collection:"Orders"}]))((function(e){var t=e.location,a=e.cartItems,o=e.currency,u=(e.decreaseQuantity,e.addToCart,e.deleteFromCart,e.deleteAllFromCart,Object(l.useState)(1)),i=(Object(c.a)(u,1)[0],Object(m.useToasts)().addToast,t.pathname);return console.log(a),r.a.createElement(l.Fragment,null,r.a.createElement(s.a,null,r.a.createElement("title",null,"Sauco | Cart"),r.a.createElement("meta",{name:"description",content:"Cart page of flone react minimalist eCommerce template."})),r.a.createElement(d.BreadcrumbsItem,{to:"/"},"Home"),r.a.createElement(d.BreadcrumbsItem,{to:""+i},"Post CheckOut"),r.a.createElement(y.a,{headerTop:"visible"},r.a.createElement(N.a,null),r.a.createElement("div",{className:"cart-main-area pt-90 pb-100"},r.a.createElement("div",{className:"container"},a&&a.length>=1?r.a.createElement(l.Fragment,null,r.a.createElement("h3",{className:"cart-page-title"},"Your Order Will Arrive Soon"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"table-content table-responsive cart-table-content"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Image"),r.a.createElement("th",null,"Product Name"),r.a.createElement("th",null,"Unit Price"),r.a.createElement("th",null,"Qty"),r.a.createElement("th",null,"Subtotal"))),r.a.createElement("tbody",null,a.map((function(e,t){var a=Object(p.a)(e.price,e.discount),c=(e.price*o.currencyRate).toFixed(2),m=(a*o.currencyRate).toFixed(2);return null!=a?m*e.quantity:c*e.quantity,r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"product-thumbnail"},r.a.createElement(n.b,{to:"/product/"+e.id},r.a.createElement("img",{className:"img-fluid",src:""+e.image[0],alt:""}))),r.a.createElement("td",{className:"product-name"},r.a.createElement(n.b,{to:"/product/"+e.id},e.name),e.selectedProductColor&&e.selectedProductSize?r.a.createElement("div",{className:"cart-item-variation"},r.a.createElement("span",null,"Color: ",e.selectedProductColor),r.a.createElement("span",null,"Size: ",e.selectedProductSize)):""),r.a.createElement("td",{className:"product-price-cart"},null!==a?r.a.createElement(l.Fragment,null,r.a.createElement("span",{className:"amount old"},o.currencySymbol+c),r.a.createElement("span",{className:"amount"},o.currencySymbol+m)):r.a.createElement("span",{className:"amount"},o.currencySymbol+c)),r.a.createElement("td",{className:"product-quantity"},e.quantity),r.a.createElement("td",{className:"product-subtotal"},null!==a?o.currencySymbol+(m*e.quantity).toFixed(2):o.currencySymbol+(c*e.quantity).toFixed(2)))})))))))):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("div",{className:"item-empty-area text-center"},r.a.createElement("div",{className:"item-empty-area__icon mb-30"},r.a.createElement("i",{className:"pe-7s-cart"})),r.a.createElement("div",{className:"item-empty-area__text"},"No items found in cart ",r.a.createElement("br",null)," ",r.a.createElement(n.b,{to:"/shop-grid-standard"},"Shop Now")))))))))}))}}]);
//# sourceMappingURL=25.a951c9b4.chunk.js.map