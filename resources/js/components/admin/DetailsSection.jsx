import React, { useEffect, useRef, useState } from "react";
import { BackButton } from "./CategorySection";
import CreatableSelect from "react-select/creatable";
import { getCategories, getBrands, useFormFields } from "./controller";
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
        category: {},
        brand: {},
        product_name: "",
        unit_price: 0,
        is_available: true,
        product_description: "",
        product_image: ""
    });
    const [options, setOptions] = useState({
        categoryOptions: [],
        brandsOptions: []
    });
    const classes = useStyles();

    // @desc extracts raw options from server response
    const extractOptions = response => {
        let options = [
            {
                label: "Unable to retrieve data",
                value: "server error",
                __isError__: true
            }
        ];
        const { data, error } = response;

        if (error) return options;
        if (data.length === 0) return options;
        options = data.reduce(
            (optionsArray, currentItem) =>
                optionsArray.push({
                    label: currentItem.category_name,
                    value: currentItem.category_id
                }),
            []
        );

        return options;
    };

    // @desc custom styles for react select
    const selectStyles = {
        control: styles => ({
            ...styles,
            border: "2px solid  #d10d0d"
        })
    };

    useEffect(() => {
        let categoriesResponse, brandsResponse;
        const fetchOptions = async () => {
            // TODO: PROMISE ALL THIS PART
            categoriesResponse = await getCategories();
            brandsResponse = await getBrands();

            const categoryOptions = extractOptions(categoriesResponse);
            const brandsOptions = extractOptions(brandsResponse);

            setOptions({ categoryOptions, brandsOptions });
        };
        fetchOptions();
        // TODO: Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    }, []);

    return (
        <section className="details-page">
            <BackButton />
            <div className="section-title">
                <h3>Product Record</h3>
            </div>
            <div className="product-form">
                <form action="#">
                    <section className="form__section">
                        <p className="form__label">Category</p>
                        <CreatableSelect
                            isClearable
                            options={options.categoryOptions}
                            onChange={changeHandlerSelect("category")}
                            styles={selectStyles}
                            placeholder="Select or create category"
                        />
                    </section>
                    <section className="form__section">
                        <p className="form__label">Brand</p>
                        <CreatableSelect
                            isClearable
                            options={options.brandsOptions}
                            onChange={changeHandlerSelect("brand")}
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
            />
        </section>
    );
}

export default DetailsSection;
