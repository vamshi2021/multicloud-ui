import { PRODCUT_DATA } from "../constants/actionTypes";

export const mainData = (products) => {
    return {
        type: PRODCUT_DATA,
        payload: products
    }
}