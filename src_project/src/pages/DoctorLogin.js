import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'


class DoctorLogin extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      password: '',
      HCId:'',
      redirect:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
//doctor login data gathering 
    var data ={
      "$class": "org.example.empty.login",
      "userid": "",
      "userpassword": "",
      "usertype": "Doctor"
    }
    data.userid= this.state.id
    data.userpassword=this.state.password
    var resData
    //login API
    await axios.post('http://localhost:3000/api/login',data)
  .then((response) => {
    console.log(response.data);
    resData=response.data

  });
  //Redirection to new page 
  if(resData === "successful"){
    this.setState({redirect:true})
  }
  else{
    this.setState({
      id: "",
      password: ""
    })
    console.log("Login Error")
  }

}


  render() {
    if(this.state.redirect){
      return (<Redirect 
        to={{
            pathname: 'doctor',
            mydat: {
              id: this.state.id,
              HCId:this.state.HCId
            }
        }}
      
      />)

    }
    return (
      <div className="FormCenter">
        <form className="FormFields" onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="id"></label>
            <input type="text" id="id" className="FormField__Input" placeholder="Enter your Doctor ID" name="id" value={this.state.id} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="password"></label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="HCId"></label>
            <input type="text" id="HCId" className="FormField__Input" placeholder="Enter your Hospital/Clinic Id" name="HCId" value={this.state.HCId} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Sign In</button> 
            <Link to="/signup" className="FormField__Link">Create an account</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default DoctorLogin;
