import React from "react";

function Footer({ assetPath }) {
    return (
        <footer className="footer">
            <div className="footer__customer">
                <h4>Customer Care</h4>
                <ul>
                    <li>Help</li>
                    <li>FAQs</li>
                    <li>Suggestions</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="footer__ghi">
                <h4>GHI Trading</h4>
                <ul>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer__social">
                <h4>Follow Us</h4>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                </ul>
            </div>
            <div className="footer__logo">
                <img
                    src={`${assetPath}images/Logo.png`}
                    alt="gHI Trading logo"
                />
                <ul>
                    <li>2020 GHI Trading. All Rights Reserved</li>
                    <li>
                        100 Gomez St., Cagayan de Oro, 9000 Misamis Oriental
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
