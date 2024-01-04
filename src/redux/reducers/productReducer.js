import { PRODCUT_DATA } from "../constants/actionTypes";

const initialState = {
    productsData:[]
}

export const productReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case PRODCUT_DATA:
            return state;
        default:
            break;
    }
}