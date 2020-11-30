import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ManageAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users : []
        }
    }

    componentDidMount() {
        axios.get('/api/accounts').then(response => { //FIX internal server error
                this.setState({
                    users : response.data
                })
            }) .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                {/*if (isEmpty({user})) {
                <div className="no-accounts">
                    <h1 className="no-accounts-h1">There's no accounts available</h1>
                    <p className="no-accounts">Create new account <a href="/account/create" className="no-accounts">here.</a></p>
                    <p className="mssg">{'{'}{'{'}session('mssg'){'}'}{'}'}</p>
                </div>
                }*/}
    
    <table className="mini-nav">
        <thead>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td><button className="button-design">Add New Account</button></td>
            </tr>
        </thead>
    </table>
    
        <div className="account-details">
            <table className="table-style">
                <thead>
                    <tr>
                        <td className="table-header">Code</td>
                        <td className="table-header">Name</td>
                        <td className="table-header">Username</td>
                        <td className="table-header">Date Created</td>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        this.state.users !== null
                            ? this.state.users.map(user => (
                                <tr>
                                    <td className="table-data"><p>{ $user.user_code }</p></td>
                                    <td className="table-data"><h3 className="account-details-text">{ $user.first_name } { $user.last_name }</h3></td>
                                    <td className="table-data"><p>@ { $user.username }</p></td>
                                    <td className="table-data"><p>{ $user.created_at }</p></td>
                                </tr>
                            ))
                            : null
                    }
                </tbody>
            </table>
        </div>
            </div>
        )
    }
    
}

export default ManageAccount;

