export declare type ParentCat = Partial<["sunglasses", "eyeglasses", "lens"]>
export declare type Material = Partial<["titanium", "stainless_steel", "tr90", "acetate", "pc", "u_item"]>
export declare type Shape =
    Partial<["wayfarer"
        , "rectangle"
        , "round"
        , "cat_eye"
        , "aviator"
        , "club_master"
        , "hexagon"
        , "square"
        , "oval"]>
export declare type FrameType = Partial<["full_rim", "half_rim", "rimless"]>
export declare type Size = Partial<["small", "medium", "large"]>

export declare type ApiFilterGlasses = Partial<{
    user_id: any,
    brand: Partial<ParentCat>,
    made: Partial<Material>,
    gender: Partial<Shape>,
    lens_type: Partial<FrameType>,
    lens_color: Partial<FrameType>,
    size: Partial<Size>,
}>

export declare type InputHandlerFilter = { cat: string, item: string, check: boolean }

export declare type ProductPositionState = Required<"left" | "right" | "top">