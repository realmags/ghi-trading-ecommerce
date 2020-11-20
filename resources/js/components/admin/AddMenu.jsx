import React, { useRef, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

function AddMenu() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { url } = useRouteMatch();
    return (
        <div className="add__container">
            <div
                className="add__button flex-center clickable"
                onClick={() => setToggleMenu(!toggleMenu)}
            >
                <span className={toggleMenu ? "add--rotate" : null}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                </span>
            </div>
            {toggleMenu && <Dropdown />}
        </div>
    );

    function Dropdown() {
        const dropdownRef = useRef(null);

        return (
            <div className="add__dropdown" ref={dropdownRef}>
                <DropdownItem action="Product record" to="products/item/add" />
                <DropdownItem action="Staff account" to="" />
            </div>
        );
    }

    function DropdownItem(props) {
        return (
            <Link to={`${url}/${props.to}`}>
                <div className="add__item">
                    <p>{props.action}</p>
                </div>
            </Link>
        );
    }
}

export default AddMenu;
