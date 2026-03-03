export interface Person {
    id: string,  //uuid
    name: string,
    email: string
    password: string,
    createdAt?: Date,
    updateAt?: Date,
    role: string,
    phone: string
}

export interface  Student extends Person {
    regNo: string,
}

export type Roles = "admin" | "staff" | "student"


