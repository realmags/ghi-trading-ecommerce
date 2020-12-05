import axios from "axios";
import { useState } from "react";

// @desc base function for axios requests
const axiosRequest = () => async (config = {}) => {
    // const endpoint = ``
    // config.url = `/api/${config.url}`;
    // if (routeParameter) endpoint += routeParameter;

    try {
        const response = await axios(config);
        // return { data: response.data, status: response.status };
        console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
            return {
                data: [],
                status: error.response.status,
                message:
                    "Unsuccessful! Product record may already exist in the database"
            };
        }
        return console.log("axios error:", error.response);
    }
};

// TODO: TEST WITH DATABASE ON
export const getSearchResults = axiosRequest({
    method: "get",
    url: "/api/products/?search="
});

// TODO: TEST, USE ASYNC AWAIT FOR IMPLEMENTATION
// async in usestate, await the variable state
// TODO: CONNECT TO INVENTORY SECTION COMPONENT
export const getCategories = axiosRequest();

export const getCategory = axiosRequest();

// TODO: TEST, USE ASYNC AWAIT FOR IMPLEMENTATION
export const getBrands = axiosRequest();

// TODO: TEST, USE ASYNC AWAIT FOR IMPLEMENTATION
export const getProduct = axiosRequest();

export const getProducts = axiosRequest();

// TODO: TEST
export const addProduct = axiosRequest();

export const addBrand = axiosRequest();

export const addCategory = axiosRequest();

export const extractOptions = (response, key) => {
    let options = [];
    const { data, status } = response;

    // response came with an error
    if (status !== 200) return options;
    // no data
    if (data.length === 0) return options;

    options = data.reduce(
        (optionsArray, currentItem) => [
            ...optionsArray,
            {
                label: currentItem[`${key}_name`],
                value: currentItem[`${key}_id`]
            }
        ],
        []
    );

    return options;
};

// @desc custom hook for handling form data
// TODO: TEST AND CONNECT TO DETAILS SECTION
export const useFormFields = (initialValues = {}) => {
    const [formFields, setFormFields] = useState(initialValues);

    const changeHandlerInput = key => e => {
        const value = e.target.value;

        if (e.target.type === "number") {
            // * comma is not allowed
            const decimalNumberRegEx = /^[0-9]+([.][0-9]+)?$/g;
            if (!decimalNumberRegEx.test(value)) {
                e.target.setCustomValidity(
                    "You can't use that character here."
                );
                return;
            } else e.target.setCustomValidity("");
        }

        setFormFields(prev => ({ ...prev, [key]: value }));
    };

    const changeHandlerSelect = key => newValue => {
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

    // TODO: CAPITALIZE VALUE OF LABEL
    const createOption = label => ({
        label,
        value: label.toLowerCase().replace(/\W/g, "")
    });

    const createHandler = key => async inputValue => {
        updateSelectStates({ isLoading: true });
        const oldOptions = selectStates[`${key}Option`];
        const inputOption = createOption(inputValue);
        const fieldLabel = key === "categories" ? "category" : "brand";
        const selectGetRequests = {
            categories: getCategories,
            brands: getBrands
        };
        const selectPostRequests = {
            categories: addCategory,
            brands: addBrand
        };
        const getRequestConfig = {
            method: "get",
            url: `/api/${key}`
        };
        const postRequestConfig = {
            method: "post",
            url: `/api/${key}/add`,
            data: {
                [`${fieldLabel}_id`]: null,
                [`${fieldLabel}_name`]: inputOption.label
            }
        };
        let postResponse, getResponse, newOptions;

        const proceed = confirm(
            `Are you sure you want to add ${inputOption.label} option?`
        );

        if (!proceed) return updateSelectStates({ isLoading: false });

        try {
            // add record to database
            postResponse = await selectPostRequests[key](postRequestConfig);

            if (postResponse.status === 200) {
                alert(`Option for ${inputOption.label} added!`);
                getResponse = await selectGetRequests[key](getRequestConfig);

                if (key === "categories")
                    newOptions = extractOptions(getResponse, "category");
                if (key === "brands")
                    newOptions = extractOptions(getResponse, "brand");
                updateSelectStates({
                    isLoading: false,
                    [`${key}Option`]: newOptions
                });
            }
        } catch (error) {
            console.error(error);
        }

        // response = await selectRequests[key](requestConfig);

        // console.group("option created");
        // console.log("wait a moment...");
        // // TODO: ADD NEW INPUT VALUE TO DATABASE
        // setTimeout(() => {
        //     const oldOptions = selectStates[key];
        //     const newOption = createOption(inputValue);
        //     console.log("new option", newOption);
        //     console.log("existing options", oldOptions);
        //     console.groupEnd();
        //     updateSelectStates({
        //         isLoading: false,
        //         [`${key}Option`]: [...oldOptions, newOption]
        //     });
        // }, 1000);
    };

    return { selectStates, createHandler, updateSelectStates };
};
