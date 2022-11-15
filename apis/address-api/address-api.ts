import { customApi, baseUrl, ExternalApi } from ".."
import { AddressModel } from "../../types/models/address.types"


export const AddressListApi = async () => {
    const data: AddressModel[] = await customApi({ url: `${baseUrl}/profile/addresses` }, { method: "GET", token: true })
    return data;
}



export const AddressListOrderApi = async (shopId:any) => {
    const data = await customApi({ url: `${baseUrl}/orders/init?shop_id=${shopId}` }, { method: "GET", token: true })
    return data;
}

export const AddressAddApi = async (e:any , position:any) => {
    let postData = JSON.stringify({
        'name': e.target[0].value,
        'mobile': e.target[1].value,
        'postcodez': e.target[2].value,
        'address': e.target[3].value,
        "latLng": {
            "lat": position[0],
            "lng": position[1]
        },
    })
    const data = await customApi({ url: `${baseUrl}/profile/addresses` }, { method: "POST", token: true , body:postData})
    return data;
}


export const AddressEditApi = async (addressSelect:any ,position:any) => {
    let postData = JSON.stringify({
        'name': addressSelect.name,
        'mobile': addressSelect.mobile,
        'postcodez': addressSelect.postcodez,
        'address': addressSelect.address,
        "latLng": {
            "lat": position[0],
            "lng":  position[1]
        },
    })

    const data = await customApi({ url: `${baseUrl}/profile/addresses/${addressSelect.id}` }, { method: "POST", token: true , body:postData})
    return data;
}


export const AddressDeleteApi = async (id:any) => {
    const data = await customApi({ url: `${baseUrl}/profile/addresses/${id}` }, { method: "DELETE", token: true })
    return data;
}


export const GetAddreessFromLatLng = async (position:any) => {
    // https://nominatim.openstreetmap.org/reverse?lat=24.074051463203265&lon=53.35029602050782&format=json
    // const data = await ExternalApi(`https://api.geoapify.com/v1/geocode/reverse?lat=${position[0]}&lon=${position[1]}&apiKey=95671afadbcd4c34b85a4257cfed1e48` )
    const data = await ExternalApi(`https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json` )

    return data;
}
