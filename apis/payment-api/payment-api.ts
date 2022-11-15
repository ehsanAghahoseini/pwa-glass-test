import { customApi, baseUrl } from ".."
import { BannerModel } from "../../types/models/banner.types"


export const PayMethodApi = async () => {
    const data = await customApi({ url: `${baseUrl}/orders/services` }, { method: 'GET', token: true });
    return data;
}

export const PayCreditsApi = async (id:any) => {
    const data = await customApi({ url: `${baseUrl}/orders/credit/${id}` }, { method: 'GET', token: true });
    return data;
}



export const StartPay = async (value: any, selectPatMethod: any, subtotal: any, coupon: any , creditDay:number , roleType:any) => {
    let selectAddress = await JSON.parse(String(localStorage.getItem('selectedAddress')))
    let sortCart: any = [];
    value.shopCart.map((item: any) => {
        sortCart.push({
            'id':item.variant_id ,
            'count':item.count ,
        })
    })    
    let postData: any = {
        'variants': sortCart,
        'receive_name': selectAddress.name,
        'service_id': selectPatMethod.id,
        'receive_phone': selectAddress.mobile,
        'receive_address': selectAddress.address,
        'receive_lat': selectAddress.location.lat,
        'receive_lng': selectAddress.location.lng,
        "receive_state": selectAddress.state,
        "receive_city": selectAddress.city,
        "receive_postcodez": selectAddress.postcodez,
        'total_payment': roleType == 1 ? (subtotal.withoutShipping).toFixed(2) : (subtotal.withShipping).toFixed(2) ,
    }
    if (coupon.status == 1) {
        postData['discount_code'] = coupon.code;
        postData['total_payment'] = (subtotal.withCouponWithOutShiping).toFixed(2);
    }
    if(roleType == 1){
        postData['credit_days '] = creditDay ;
    }
    const data = await customApi({ url: `${baseUrl}/orders` }, { method: 'POST', body: JSON.stringify(postData), token: true });
    return data;
}



export const CheckCoupon = async (couponRef: any , shop_id:any) => {
    let postData = {
        'discount_code': couponRef.current.value,
        'shop_id':shop_id ,
    }
    const data = await customApi({ url: `${baseUrl}/discounts` }, { method: 'POST', body: JSON.stringify(postData), token: true });
    return data;
}


export const ProductCheckBasketEntity = async (cards: any) => {
    let basket = [];
    for (let card of cards) {
        let listProduct = []
        for (let product of card.shopCart) {
            listProduct.push(product.product_slug)
        }
        basket.push({
            "shop_id": card.shop.id,
            "products": listProduct
        })
    }    
    let postData = {
        'baskets' : basket
    }
    const data = await customApi({ url: `${baseUrl}/orders/check` }, { method: 'POST', body: JSON.stringify(postData), token: true });
    return data;
}


export const CheckStockProductOnBasket = async (variant_id: number) => {
    let postData = {
        'variant_id': variant_id,
    }
    const data = await customApi({ url: `${baseUrl}/orders/find` }, { method: 'POST', body: JSON.stringify(postData), token: true });
    return data;
}


