import { createStore, combineReducers } from 'redux';
import userReducer from './UserSlice';
import formReducer from "@/Redux/Reducers.ts";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('persist');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Error loading state from localStorage:", err);
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('persist', serializedState);
    } catch (err) {
        console.error("Error saving state to localStorage:", err);
    }
};

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
});

const persistedState = loadState();

export const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
