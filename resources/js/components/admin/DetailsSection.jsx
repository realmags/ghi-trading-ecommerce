import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { BackButton } from "./CategorySection";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
    getCategories,
    getBrands,
    addProduct,
    getProduct,
    updateProduct,
    extractOptions,
    useFormFields,
    useSelectStates
} from "./controller";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    makeStyles
} from "@material-ui/core";

// @desc custom styles for material ui radio
const useStyles = makeStyles({
    root: {
        color: "#d10d0d"
    }
});

function DetailsSection() {
    const {
        formFields,
        changeHandlerInput,
        changeHandlerSelect,
        updateFormFields
    } = useFormFields({
        product_id: null,
        category_id: 0,
        brand_id: 0,
        product_name: "",
        unit_price: null,
        is_available: true,
        product_description: "",
        product_image: ""
    });
    const classes = useStyles();
    const { selectStates, createHandler, updateSelectStates } = useSelectStates(
        {
            categoriesOption: [],
            brandsOption: [],
            isLoading: true,
            defaultCategory: {
                label: "Category",
                value: "0"
            },
            defaultBrand: {}
        }
    );
    const { product_id } = useParams();

    // @desc custom styles for react select
    const selectStyles = {
        control: styles => ({
            ...styles,
            border: "2px solid  #d10d0d"
        })
    };

    const fetchOptions = async () => {
        // TODO: PROMISE ALL THIS PART
        try {
            let categoriesResponse, brandsResponse;
            categoriesResponse = await getCategories({
                method: "get",
                url: "/api/categories"
            });
            // TODO: MAKE BRANDS API ROUTE
            brandsResponse = await getBrands({
                method: "get",
                url: "/api/brands"
            });

            const categoriesOption = extractOptions(
                categoriesResponse,
                "category"
            );
            const brandsOption = extractOptions(brandsResponse, "brand");

            return [categoriesOption, brandsOption];
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDefault = async () => {
        // fetch product
        try {
            const response = await getProduct({
                method: "get",
                url: `/api/products/item/${product_id}`
            });
            const { data } = response;
            // return data.data;
            const defaultState = {
                product_id: data.product_id,
                category_id: data.category_id,
                brand_id: data.brand_id,
                product_name: data.product_name,
                unit_price: data.unit_price,
                is_available: data.is_available,
                product_description: data.product_description,
                product_image: data.product_image
            };
            const defaultCategory = {
                label: data.category_name,
                value: data.category_id
            };
            const defaultBrand = {
                label: data.brand_name,
                value: data.brand_id
            };
            console.log("default state from fetchDefault", defaultState);
            return [defaultState, defaultCategory, defaultBrand];
        } catch (error) {
            console.error(error);
        }
    };

    const resetFormFields = () => {
        const inputFields = Array.from(
            document.querySelectorAll(".form__section > input")
        );
        inputFields.forEach(input => (input.value = ""));
    };

    const onFormSubmit = async e => {
        let response, message, alertMessage;

        e.preventDefault();

        // check if category_id is empty
        if (!formFields.category_id) return alert("Category is required");

        // check if brand_id is empty
        if (!formFields.brand_id) return alert("Brand is required");

        if (product_id) {
            // console.log('updating record...');
            message = "updating record...";
            alertMessage = "You have successfully UPDATED a product record.";
            response = await updateProduct({
                method: "put",
                url: `/api/products/item/update/${product_id}`,
                data: formFields
            });
        } else {
            message = "saving record...";
            alertMessage = "You have successfully ADDED a product record.";
            response = await addProduct({
                method: "post",
                url: "/api/products/item/add",
                data: formFields
            });
        }

        console.log(message);
        if (response.status === 200) {
            alert(alertMessage);
            resetFormFields();
        } else alert(`Error! ${response.message}`);
    };

    useEffect(() => {
        const setDetailsSectionStates = async () => {
            const [categoriesOption, brandsOption] = await fetchOptions();
            let defaultBrand = {},
                defaultCategory = {},
                defaultState = {};
            // console.log("product_id params", product_id);
            if (product_id) {
                [
                    defaultState,
                    defaultCategory,
                    defaultBrand
                ] = await fetchDefault();
                // console.log(defaultState);
                updateFormFields(defaultState);
            }

            updateSelectStates({
                categoriesOption,
                brandsOption,
                defaultBrand,
                defaultCategory,
                isLoading: false
            });
        };
        setDetailsSectionStates();
        // TODO: Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    }, []);

    return (
        <section className="details-page">
            <BackButton />
            <div className="section-title">
                <h3>Product Record</h3>
            </div>
            <div className="product-form">
                <form onSubmit={onFormSubmit}>
                    <section className="form__section">
                        <p className="form__label">Category</p>
                        <CreatableSelect
                            isClearable
                            isDisabled={selectStates.isLoading}
                            isLoading={selectStates.isLoading}
                            options={selectStates.categoriesOption}
                            onChange={changeHandlerSelect("category_id")}
                            onCreateOption={createHandler("categories")}
                            styles={selectStyles}
                            placeholder="Select or create category"
                            value={
                                selectStates.categoriesOption[
                                    formFields.category_id - 1
                                ] || null
                            }
                        />
                    </section>
                    <section className="form__section">
                        <p className="form__label">Brand</p>
                        <CreatableSelect
                            isClearable
                            isDisabled={selectStates.isLoading}
                            isLoading={selectStates.isLoading}
                            options={selectStates.brandsOption}
                            onChange={changeHandlerSelect("brand_id")}
                            onCreateOption={createHandler("brands")}
                            styles={selectStyles}
                            placeholder="Select or create brand"
                            value={
                                selectStates.brandsOption[
                                    formFields.brand_id - 1
                                ] || null
                            }
                        />
                    </section>
                    <FormInput
                        type="text"
                        name="product_name"
                        id="product_name"
                        placeholder="Product name"
                        label="Product Name"
                        onChange={changeHandlerInput}
                        default={formFields.product_name}
                    />
                    <section className="form__section">
                        <label htmlFor="unit_price" className="form__label">
                            Price
                        </label>
                        <input
                            type="number"
                            name="unit_price"
                            id="unit_price"
                            placeholder="Unit price"
                            onChange={changeHandlerInput("unit_price")}
                            min="0"
                            step="0.01"
                            required
                            defaultValue={formFields.unit_price}
                        />
                    </section>
                    <section className="form__section">
                        <p className="form__label">Availability</p>
                        <div className="form__radio">
                            <RadioGroup
                                name="is_available"
                                defaultValue="true"
                                onChange={changeHandlerInput("is_available")}
                                row
                                // defaultValue={
                                //     formFields.is_available == 1 ? true : false
                                // }
                                value={
                                    formFields.is_available == 1 ||
                                    formFields.is_available == true
                                        ? "true"
                                        : "false"
                                }
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio className={classes.root} />}
                                    label="On Stock"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio className={classes.root} />}
                                    label="Out of Stock"
                                />
                            </RadioGroup>
                        </div>
                    </section>
                    <FormInput
                        type="text"
                        name="product_description"
                        id="product_description"
                        placeholder="Product description"
                        label="Description"
                        onChange={changeHandlerInput}
                        default={formFields.product_description}
                    />
                    <FormInput
                        type="text"
                        name="product_image"
                        id="product_image"
                        placeholder="Product image URL"
                        label="Image"
                        onChange={changeHandlerInput}
                        default={formFields.product_image}
                    />
                    <button type="submit" className="form__submit">
                        Save Record
                    </button>
                </form>
            </div>
        </section>
    );
}

function FormInput(props) {
    return (
        <section className="form__section">
            <label htmlFor={props.id} className="form__label">
                {props.label}
            </label>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                onChange={props.onChange(props.name)}
                required
                defaultValue={props.default}
            />
        </section>
    );
}

export default DetailsSection;
