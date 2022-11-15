import React from 'react';
import { toast } from "react-toastify";


async function AddToCart(product: any, children: any, variant_id?: any) {    
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    let cart_string = localStorage.getItem('cart');
    if (typeof cart_string === 'string') {
        var cart = JSON.parse(cart_string);
    }
    for (let item of cart) {
        if (item.shop.id == product.shop.id) {
            for (let pro of item.shopCart) {
                if (product.id == pro.product_parent_id && pro.variant_id == variant_id ) {
                    pro.count++;
                    localStorage.setItem('cart', JSON.stringify(cart))
                    let cardLength = await CountProductOfCard(cart);
                    // toast("Success add to cart", { type: "success" })
                    return [cart, cardLength];
                }
            }
            item.shopCart.push({
                'count': 1,
                'uri': product.uri,
                'variant_id': variant_id,
                'price': children.discount !== 0 ? children.price - (children.price * children.discount / 100) : children.price,
                'lens_color': children.lens_color,
                'lens_type': children.lens_type,
                'title': product.title,
                'image': children.top,
                'color': children.color.image,
                'color_id': children.color.id,
                'delivery_day': product.delivery_day,
                'product_parent_id': product.id,
                'product_parent_slug': product.slug,
            })
            let cardLength = await CountProductOfCard(cart);
            localStorage.setItem('cart', JSON.stringify(cart))
            // toast("Success add to cart", { type: "success" })
            return [cart, cardLength];
        }
    }
    cart.push({
        'shop': {
            'id': product.shop.id,
            'name': product.shop.name,
            'logo': product.shop.logo,
            'slug': product.shop.slug,
            'feathers': product.feathers,
            'shipping_price': product.shop.shipping_price,
            'review': product.shop.review,
        },
        'shopCart': [{
            'count': 1,
            'uri': product.uri,
            'variant_id': variant_id,
            'price': children.discount !== 0 ? children.price - (children.price * children.discount / 100) : children.price,
            'lens_color': children.lens_color,
            'lens_type': children.lens_type,
            'title': product.title,
            'image': children.top,
            'color': children.color.image,
            'color_id': children.color.id,
            'delivery_day': product.delivery_day,
            'product_parent_id': product.id,
            'product_parent_slug': product.slug,
        }]
    })
    let cardLength = await CountProductOfCard(cart);
    localStorage.setItem('cart', JSON.stringify(cart))
    return [cart, cardLength];
}

export { AddToCart };




async function DeleteProduct(product_id:any ,shopID: number, variant_id:any) {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    let cart_string = localStorage.getItem('cart');
    if (typeof cart_string === 'string') {
        var cart = JSON.parse(cart_string);
    }
    for (let singleCart of cart) {
        if (singleCart.shop.id == shopID) {
            for (let pro in singleCart.shopCart) {
                if (product_id == singleCart.shopCart[pro].product_parent_id && singleCart.shopCart[pro].variant_id == variant_id) {
                    singleCart.shopCart.splice(pro, 1)
                    let cardLength = await CountProductOfCard(cart);
                    localStorage.setItem('cart', JSON.stringify(cart))
                    return [cart, cardLength];
                }
            }
        }
    }
    return cart;
}
export { DeleteProduct };




async function PlusItem(product_id:any ,shopID: number, variant_id:any) {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    let cart_string = localStorage.getItem('cart');
    if (typeof cart_string === 'string') {
        var cart = JSON.parse(cart_string);
    }
    for (let singleCart of cart) {
        if (singleCart.shop.id == shopID) {
            for (let pro of singleCart.shopCart) {
                if (product_id == pro.product_parent_id && +pro.variant_id == variant_id) {
                    pro.count++;
                    let cardLength = await CountProductOfCard(cart);
                    localStorage.setItem('cart', JSON.stringify(cart))
                    return [cart, cardLength];
                }
            }
        }
    }
    return cart;
}
export { PlusItem };



async function Minusetem(product_id:any ,shopID: number, variant_id: any) {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    let cart_string = localStorage.getItem('cart');
    if (typeof cart_string === 'string') {
        var cart = JSON.parse(cart_string);
    }
    for (let singleCart of cart) {
        if (+singleCart.shop.id == shopID) {
            for (let pro of singleCart.shopCart) {
                if (product_id == pro.product_parent_id && pro.variant_id == variant_id) {
                    pro.count--;
                    let cardLength = await CountProductOfCard(cart);
                    localStorage.setItem('cart', JSON.stringify(cart))
                    return [cart, cardLength];
                }
            }
        }
    }
    return cart;
}

export { Minusetem };




async function DeleteCart(shopID: string) {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    let cart_string = localStorage.getItem('cart');
    if (typeof cart_string === 'string') {
        var cart = JSON.parse(cart_string);
    }
    for (let singleCart in cart) {
        if (cart[singleCart].shop.id == shopID) {
            cart.splice(singleCart, 1);
            let cardLength = await CountProductOfCard(cart);
            localStorage.setItem('cart', JSON.stringify(cart))
            return [cart, cardLength];
        }
    }
    return cart;
}
export { DeleteCart };



function CountProductOfCard(card: any) {
    let count = 0;
    for (let i of card) {
        for (let j of i.shopCart) {
            count = +count + +j.count;
        }
    }
    return count;

}
export { CountProductOfCard };







