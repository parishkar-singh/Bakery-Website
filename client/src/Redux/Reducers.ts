import { SET_FORM_VALUES } from './Actions';

const initialState = {
    Shape: 'triangle',
    Temperature: 150,
    NutsQuantity: 69,
    SweetBakingSoda: 120,
    FiberQuantity: 70,
    SugarQuantity: 90,
    OilQuantity: 50,
};

const formReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FORM_VALUES:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default formReducer;
