export interface IUser {
    name: string;
    lastname: string;
    mobile: string;
    citizenId: string;
    email: string;
    role: string;
    _id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    __v: number;
}

export type IProductType = IProduct[];

export interface IProduct {
    _id: string;
    product_name?: string;
    product_type?: string;
    price?: string;
    mobile?: string;
    description?: string;
    file?: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    __v: number;
}

export interface IGenericResponse {
    status: string
    message: string
}