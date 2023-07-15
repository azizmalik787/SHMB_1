import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'


class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      password: '',
      redirect:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    this.setState({
    [target.name]: target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    //getting data for hospital login

    var data ={
      "$class": "org.example.empty.login",
      "userid": "",
      "userpassword": "",
      "usertype": "Hospital"
    }
    data.userid= this.state.id
    data.userpassword=this.state.password
    var resData
    //api call for login hospital
    await axios.post('http://localhost:3000/api/login',data)
  .then((response) => {
    resData = response.data
  });
//successful redirection
  if(resData==='successful'){
    this.setState({redirect:true})
  }
  else {
    console.log("Login Error Occured")
  }



  }

  render() {
    if(this.state.redirect){
      return (<Redirect 
        to={{
            pathname: 'hospital',
            mydat: this.state.id
        }}
      
      />)

    }
    return (
      <div >
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">

            <input type="text" id="id" className="FormField__Input" placeholder="Enter your Hospital ID" name="id" value={this.state.id} onChange={this.handleChange} />
          </div>

          <div className="FormField">

            <input type="password" id="password" className="FormField__Input" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <button type="submit" className="FormField__Button mr-20">Sign In</button> 
            <Link to="/signup" className="FormField__Link">Create an account</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
