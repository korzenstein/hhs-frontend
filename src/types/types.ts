export enum WardColors {"Red", "Yellow", "Blue", "Green"}

export interface Ward {
    id: string
    name: string
    color: WardColors
}

export interface Nurse {
    id: string
    first_name: string
    last_name: string
    email: string
    employee_id: number
    ward_name: string
    ward_color: WardColors
    ward_id: string
}


export type NurseInput = {
  first_name: string;
  last_name: string;
  email: string;
  ward_id: string;
};

