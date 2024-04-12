import { createStore, combineReducers } from 'redux';
import userReducer from './UserSlice';

// Function to load state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Function to save state to local storage
const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch {
        // Handle errors
    }
};

// Reducer for managing dark mode state
const themeReducer = (state = 'light', action: any) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return state === 'light' ? 'dark' : 'light';
        default:
            return state;
    }
};

// Reducer for managing active tab state
const tabReducer = (state = 'Employees', action: any) => {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return action.payload;
        default:
            return state;
    }
};

// Root reducer combining userReducer, themeReducer, and tabReducer
const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    activeTab: tabReducer, // Add tabReducer here
});

// Load persisted state from local storage
const persistedState = loadState();

// Create Redux store with rootReducer and persistedState
export const store = createStore(
    rootReducer,
    persistedState
);

// Subscribe to store changes to save state to local storage
store.subscribe(() => {
    saveState({
        user: store.getState().user, // Only save user state
        theme: store.getState().theme, // Save theme state
        activeTab: store.getState().activeTab // Save active tab state
    });
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;