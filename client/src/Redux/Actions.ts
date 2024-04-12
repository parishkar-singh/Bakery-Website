
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export const toggleTheme = () => ({
    type: TOGGLE_THEME
});
export const setActiveTab = (activeTab: string) => ({
    type: SET_ACTIVE_TAB,
    payload: activeTab,
});
