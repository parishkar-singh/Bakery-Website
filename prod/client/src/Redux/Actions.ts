'use client'
export const SET_FORM_VALUES = 'SET_FORM_VALUES';

export const setFormValues = (values: any) => ({
    type: SET_FORM_VALUES,
    payload: values,
});
