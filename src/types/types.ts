export enum WardColors {"Red", "Yellow", "Blue", "Green"}

export interface Ward {
    id: string
    name: string
    color: WardColors
}

export interface Nurse {
    id: string
    firstName: string
    lastName: string
    email: string
    employeeID: number
}

