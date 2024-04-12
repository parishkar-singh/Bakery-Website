import { SET_ACTIVE_TAB } from "./Actions"; // Update the import path to match the actual location of your Actions file

const initialState = {
    activeTab: 'Employees',
};

const sidebarReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload,
            };
        default:
            return state;
    }
};

export default sidebarReducer;
