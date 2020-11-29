import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const count = 0;
const orders = {
    orderNo: "002",
    buyer: "",
    qty: 0,
    items: "",
    remarks: "pending"
};

function OrderRequest() {
    return (
        <div>
            <div className="content">  
                <div><h2>{count} NEW REQUESTS</h2></div>
                <div className="req-options">
                    <ul className="list-style">
                        <li className="list-item">Sort</li>
                        <li className="list-item">|</li>
                        <li className="list-item">Delete</li>
                    </ul>
                </div>
            </div>

            <div className="request-box">
                <table className="table-style">
                    <tr>
                        <td className="table-header">ORDER NO.</td>
                        <td className="table-header">CONTACT DETAILS</td>
                        <td className="table-header">QTY</td>
                        <td className="table-header">ITEMS</td>
                        <td className="table-header">REMARKS</td>
                    </tr>
                    <tr className="table-data-pending">
                        <td className="table-data"><h3>{orders.orderNo}</h3></td>
                        <td className="table-data"><h3>Jasson</h3></td>
                        <td className="table-data"><h3>1</h3></td>
                        <td className="table-data"><p>12V Light Bulb</p></td>
                        <td className="table-data">
                            <p>
                            <button className="btn-remarks">REJECT</button>     
                            <button className="btn-remarks">CONFIRM</button>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-data"><h3>001</h3></td>
                        <td className="table-data"><h3>Jasson</h3></td>
                        <td className="table-data"><h3>1</h3></td>
                        <td className="table-data"><p>12V Light Bulb</p></td>
                        <td className="table-data">
                            <p>
                            <button className="btn-remarks">REJECT</button>     
                            <button className="btn-remarks">CONFIRM</button>
                            </p>
                        </td>
                    </tr>
                </table>

                <div className="data">
                    
                </div>
            </div>
        </div>
    )
}

export default OrderRequest;

if (document.getElementById('order')) {
    ReactDOM.render(<OrderRequest />, document.getElementById('order'));
}