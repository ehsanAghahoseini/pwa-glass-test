export declare type IRolesPermission = {
    add?: string,
    remove?: string,
    update?: string,
    view?: string
}

export const ProductsPermissions: IRolesPermission = {
    add: "product.add",
    remove: "product.delete",
    update: "product.edit",
    view: "product.see"
}

export const OrdersPermissions: IRolesPermission = {
    update: "order.update",
    view: "order.see"
}

export const PurchasesPermissions: IRolesPermission = {
    view: "purchases.see"
}

export const StatementPermissions: IRolesPermission = {
    view: "statement.see"
}

export const WalletPermissions: IRolesPermission = {
    view: "wallet.see"
}

export const CreditsPermissions: IRolesPermission = {
    update: "credits.update",
    view: "credits.see"
}

export const OperatorsPermissions: IRolesPermission = {
    add: "user.add",
    update: "user.update",
    view: "user.see",
    remove: "user.delete",
}

export const SettingPermissions: IRolesPermission = {
    update: "setting.update",
    view: "setting.see"
}

export const ProfilePermissions: IRolesPermission = {
    update: "profile.update",
    view: "profile.see"
}


export const CouponsPermissions: IRolesPermission = {
    add: "coupon.add",
    update: "coupon.update",
    view: "coupon.see"
}

export const ChatsPermissions: IRolesPermission = {
    add: "chat.add",
    update: "chat.update",
    view: "chat.see"
}

export const PricePermissions: IRolesPermission = {
    view: "price.show"
}



