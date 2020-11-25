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
        // let value = null;
        // if (newValue) value = newValue.value;
        setFormFields(prev => ({
            ...prev,
            [key]: newValue ? newValue.value : null
        }));
    };

    return {
        formFields,
        changeHandlerInput,
        changeHandlerSelect
    };
};

export const useSelectStates = (initialValues = {}) => {
    const [selectStates, setSelectStates] = useState(initialValues);

    const updateSelectStates = (updates = {}) => {
        setSelectStates(prev => ({ ...prev, ...updates }));
    };

    // TODO: HOW TO CAPITALIZE VALUE
    const createOption = label => ({
        label,
        value: label.toLowerCase().replace(/\W/g, "")
    });

    const createHandler = key => inputValue => {
        updateSelectStates({ isLoading: true });
        console.group("option created");
        console.log("wait a moment...");
        // TODO: ADD NEW INPUT VALUE TO DATABASE
        setTimeout(() => {
            const oldOptions = selectStates[key];
            const newOption = createOption(inputValue);
            console.log("new option", newOption);
            console.log("existing options", oldOptions);
            console.groupEnd();
            // setSelectStates(prev => ({
            //     ...prev,
            //     isLoading: !prev.isLoading,
            //     [key]: [...oldOptions, newOption]
            // }));
            updateSelectStates({
                isLoading: false,
                [key]: [...oldOptions, newOption]
            });
        }, 1000);
    };

    return { selectStates, createHandler, updateSelectStates };
};
