import axios from "axios";
import { useState } from "react";

// @desc base fucntion for axios get requests
const axiosGetRequest = endpoint => async (routeParameter = null) => {
    let URL = `/api/${endpoint}`;
    if (routeParameter) URL += routeParameter;

    try {
        const response = await axios.get(URL);
        return response;
    } catch (error) {
        // console.error(error);
        return { error };
    }
};

// TODO: TEST WITH DATABASE ON
export const getSearchResults = axiosGetRequest("products/?search=");

// TODO: TEST, USE ASYNC AWAIT FOR IMPLEMENTATION
// async in usestate, await the variable state
// TODO: CONNECT TO INVENTORY SECTION COMPONENT
export const getCategories = axiosGetRequest("categories");

// TODO: TEST, USE ASYNC AWAIT FOR IMPLEMENTATION
export const getBrands = axiosGetRequest("brands");

// TODO: TEST, USE ASYNC AWAIT FOR IMPLEMENTATION
export const getProduct = axiosGetRequest("products/item/");

// @desc custom hook for handling form data
// TODO: TEST AND CONNECT TO DETAILS SECTION
export const useFormFields = (initialValues = {}) => {
    const [formFields, setFormFields] = useState(initialValues);

    const changeHandlerInput = key => e => {
        const value = e.target.value;
        setFormFields(prev => ({ ...prev, [key]: value }));
    };

    const changeHandlerSelect = key => newValue => {
        setFormFields(prev => ({ ...prev, [key]: newValue }));
    };

    return {
        formFields,
        changeHandlerInput,
        changeHandlerSelect
    };
};
