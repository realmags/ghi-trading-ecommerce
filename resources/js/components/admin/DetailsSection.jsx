import React from "react";
import { BackButton } from "./CategorySection";
import CreatableSelect from "react-select/creatable";

function DetailsSection() {
    // TODO: SEPARATE VARIABLES AND METHODS INTO ANOTHER FILE
    const categoryOptions = [
        { label: "Paints", value: "paints" },
        { label: "Screws", value: "screws" }
    ];

    const brandOptions = [
        { label: "Philips", value: "philips" },
        { label: "Boysen", value: "boysen" }
    ];

    const selectStyles = {
        control: styles => ({
            ...styles,
            border: "2px solid  #d10d0d"
        })
    };

    const handleChange = (newValue, actionMeta) => {
        console.group("Value changed");
        console.log(newValue);
        // get the value for form data
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    const handleInputChange = (inputValue, actionMeta) => {
        console.group("Input chagned");
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

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
                            options={categoryOptions}
                            onChange={handleChange}
                            onInputChange={handleInputChange}
                            styles={selectStyles}
                            placeholder="Select or create category"
                        />
                    </section>
                    <section className="form__section">
                        <p className="form__label">Brand</p>
                        <CreatableSelect
                            isClearable
                            options={brandOptions}
                            onChange={handleChange}
                            onInputChange={handleInputChange}
                            styles={selectStyles}
                            placeholder="Select or create brand"
                        />
                    </section>
                    <section className="form__section">
                        <label htmlFor="product_name" className="form__label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="product_name"
                            placeholder="Product name"
                        />
                    </section>
                    <section className="form__section">
                        <label htmlFor="unit_price" className="form__label">
                            Price
                        </label>
                        <input
                            type="number"
                            name="unit_price"
                            id="unit_price"
                            placeholder="Unit price"
                        />
                    </section>
                    <section className="form__section">
                        <p className="form__label">Availability</p>
                        <div className="form__radio">
                            <RadioButton
                                name="is_available"
                                id="available"
                                label="On Stock"
                            />
                            <RadioButton
                                name="is_available"
                                id="unavailable"
                                label="Out of Stock"
                            />
                        </div>
                    </section>
                    <section className="form__section">
                        <label
                            htmlFor="product_description"
                            className="form__label"
                        >
                            Description
                        </label>
                        <input
                            name="product_description"
                            id="product_description"
                            placeholder="Product description"
                        />
                    </section>
                    <section className="form__section">
                        <label htmlFor="product_image" className="form__label">
                            Image
                        </label>
                        <input
                            type="text"
                            id="product_image"
                            placeholder="Product image URL"
                        />
                    </section>
                    <button type="submit" className="form__submit">
                        Save Record
                    </button>
                </form>
            </div>
        </section>
    );

    function RadioButton(props) {
        return (
            <label className="radio">
                <span className="radio__input">
                    <input type="radio" name={props.name} id={props.id} />
                    <span className="radio__control"></span>
                </span>
                <span className="radio__label">{props.label}</span>
            </label>
        );
    }
}

export default DetailsSection;
