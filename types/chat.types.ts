
export declare type ShopData = any

export declare type TextType = {
    type: "text",
    content: {
        name: string,
        time: string,
        messge: string
        logoUrl: string
    }
}
export declare type PictureType = {
    type: "pic",
    content: {
        name: string,
        time: string,
        logoUrl: string,
        imageUrl: string
    }
}

export declare type ProductType = { 
    type: "product",
    content: {
        name: string,
        time: string,
        logoUrl: string,
        productImgUrl: string,
        productName: string,
        productId: string,
    }
}


export declare type ChatContent = TextType | PictureType | ProductType