import React, { useEffect, useRef, useState } from "react";
import { BackButton } from "./CategorySection";
import CreatableSelect from "react-select/creatable";
import {
    getCategories,
    getBrands,
    addProduct,
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
        changeHandlerSelect
    } = useFormFields({
        product_id: null,
        category_id: "",
        brand_id: "",
        product_name: "",
        unit_price: 0,
        is_available: true,
        product_description: "",
        product_image: ""
    });
    const classes = useStyles();
    const { selectStates, createHandler, updateSelectStates } = useSelectStates(
        {
            categoriesOption: [],
            brandsOption: [],
            isLoading: true
        }
    );

    // @desc extracts raw options from server response
    // const extractOptions = (response, key) => {
    //     let options = [];
    //     const { data, status } = response;

    //     // response came with an error
    //     if (status !== 200) return options;
    //     // no data
    //     if (data.length === 0) return options;

    //     options = data.reduce(
    //         (optionsArray, currentItem) => [
    //             ...optionsArray,
    //             {
    //                 label: currentItem[`${key}_name`],
    //                 value: currentItem[`${key}_id`]
    //             }
    //         ],
    //         []
    //     );

    //     return options;
    // };

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

    const resetFormFields = () => {
        const inputFields = Array.from(
            document.querySelectorAll(".form__section > input")
        );
        inputFields.forEach(input => (input.value = ""));
    };

    const onFormSubmit = async e => {
        e.preventDefault();

        // check if category_id is empty
        if (!formFields.category_id) return alert("Category is required");

        // check if brand_id is empty
        if (!formFields.brand_id) return alert("Brand is required");

        console.log("saving record...");
        const response = await addProduct({
            method: "post",
            url: "/api/products/item/add",
            data: formFields
        });
        if (response.status === 200) {
            alert("Product added!");
            resetFormFields();
        } else alert(`Error! ${response.message}`);
    };

    useEffect(() => {
        const awaitFetchOptions = async () => {
            const [categoriesOption, brandsOption] = await fetchOptions();
            updateSelectStates({
                categoriesOption,
                brandsOption,
                isLoading: false
            });
        };
        awaitFetchOptions();
        // TODO: Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

        // const reactSelect = Array.from(
        //     document.querySelectorAll(".css-b8ldur-Input input")
        // );
        // console.log(reactSelect);
        // reactSelect.forEach(input => (input.required = true));
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
                        />
                    </section>
                    <FormInput
                        type="text"
                        name="product_name"
                        id="product_name"
                        placeholder="Product name"
                        label="Product Name"
                        onChange={changeHandlerInput}
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
                    />
                    <FormInput
                        type="text"
                        name="product_image"
                        id="product_image"
                        placeholder="Product image URL"
                        label="Image"
                        onChange={changeHandlerInput}
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
            />
        </section>
    );
}

export default DetailsSection;
