import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'


class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      password: '',
      passId: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });

  }



  async handleSubmit(e) {
    e.preventDefault();
    var resData

    if (this.state.id.includes("P")) {
      var data = {
        "$class": "org.example.empty.login",
        "userid": "",
        "userpassword": "",
        "usertype": "Patient"
      }
      data.userid = this.state.id
    data.userpassword = this.state.password
      await axios.post('http://localhost:3000/api/login', data)
        .then((response) => {
          
          resData = response.data
          

        });
        if (resData === 'successful') {
          this.setState({ redirect: true })
        }
        else {
          console.log("Login Error Occured")
        }

    }
    else{
      var cnicData = {
        "$class": "org.example.empty.patientCnicLogin",
        "usercnic": "",
        "userpassword": ""
      }
      cnicData.usercnic = this.state.id
      cnicData.userpassword = this.state.password


      await axios.post('http://localhost:3000/api/patientCnicLogin', cnicData)
        .then((response) => {
          resData = response.data
          //api RESPONSE back if id is returned then 
          if (resData !== "unsuccessful") {
            this.setState({id:resData})
            this.setState({ redirect: true })
          }
          else {
            console.log("Login Error Occured")
          }
        });
    }
    

    


  }
  render() {
    if (this.state.redirect) {
      return (<Redirect
        to={{
          pathname: 'patient',
          mydat: this.state.id
        }}

      />)

    }
    return (
      <form id="patientLoginForm" className="FormFields" onSubmit={this.handleSubmit}>
        <div className="FormField">
          <input type="text" id="id" className="FormField__Input" placeholder="Enter your Patient ID/CNIC" name="id" value={this.state.id} onChange={this.handleChange} />
        </div>

        <div className="FormField">
          <input type="password" id="password" className="FormField__Input" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>

        <div className="FormField">
          <button className="FormField__Button mr-20">Sign In</button>
          <Link to="/signup" className="FormField__Link">Create an account</Link>
        </div>

      </form>
    );
  }
}

export default SignInForm;
