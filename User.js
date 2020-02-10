import React , { Component } from 'react';
import axios from 'axios';

class User extends Component {
    constructor() {
        super();
        this.state = {
            usersList : []
        }

        axios.get('http://localhost:3003/users').then((user) => {
            this.setState({
                usersList : user.data
            })
            console.log("Saved User Details are : ", this.state.usersList);
        }).catch((error) => {
            console.log(error);
        })
    }

    submitDetails = () => {
        alert('Registration Successful!');

        let user = {
            userID : this.refs.userID.value,
            firstName : this.refs.firstName.value,
            age : this.refs.age.value,
            location : this.refs.location.value
        }

        axios.post('http://localhost:3003/users', user).then((res) => {
            alert(res.data.msg);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let userData = this.state.usersList.map((user) => {
            return (
            <tr>
                <td>{ user.userID }</td>
                <td>{ user.firstName }</td>
                <td>{ user.age }</td>
                <td>{ user.location }</td>
            </tr>
            )
        })

        return (
            <div className = "container" align = "center" style = {{backgroundColor : 'beige', height : "100vh"}}>
                <h2 style = {{backgroundColor : "royalblue", padding : "12px", color : "white"}}>Registration Page</h2>
                <br></br><br></br>

                <form onSubmit = { this.submitDetails }>
                    <h2>New User Registration</h2>
                    <label>
                        User ID : 
                    </label>
                    <input type = "number" ref = "userID" style = {{marginLeft : "20px", marginBottom : "6px"}}></input><br></br>
                    <label>
                        Name : 
                    </label>
                    <input type = "text" ref = "firstName" style = {{marginLeft : "29px", marginBottom : "6px"}}></input><br></br>
                    <label>
                        Age : 
                    </label>
                    <input type = "number" ref = "age" style = {{marginLeft : "44px", marginBottom : "6px"}}></input><br></br>
                    <label>
                        Location : 
                    </label>
                    <input type = "text" ref = "location" style = {{marginLeft : "12px", marginBottom : "6px"}}></input><br></br>
                    <input type="submit" style= {{backgroundColor : "lightgreen", height : "32px", width : "74px", marginTop : "8px"}}></input>
                </form>

                <h3 style = {{marginTop : "44px"}}>Registered User Details</h3>
                <table border="2">
                    <thead>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Age</th>
                        <th>Location</th>
                    </thead>
                    <tbody>
                        { userData }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default User;