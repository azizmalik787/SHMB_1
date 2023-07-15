import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      password: '',
      idError:'',
      passwordError:'',
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
    const isError = this.validate()
    console.log(isError)
    if (isError === false) {
//gethering data for login of laboratory 
    var data ={
      "$class": "org.example.empty.login",
      "userid": "",
      "userpassword": "",
      "usertype": "Lab"
    }
    data.userid= this.state.id
    data.userpassword=this.state.password
    var resData
    //API to login
    await axios.post('http://localhost:3000/api/login',data)
  .then((response) => {
    console.log(response.data);
    resData=response.data
  });
  //redirection to lab main page 
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
  else{
    console.log("validation Error")
  }
  }
  validate = () => {
    let isError = false;
    let idError = "";
    let passwordError = "";
    
    if (this.state.id==='') {
      idError = "ID field is Mendatory. ";
      this.setState({ idError })
      isError = true;
    }
    //valid entity 
    if (!(this.state.id.includes("L"))) {
      idError = "Invalid entity ";
      this.setState({ idError: this.state.idError+ idError })
      isError = true;
    }
    //valid entity 
    console.log(this.state.id.length)
    if (this.state.id.length < 3) {
      idError = "Invalid Id ";
      this.setState({ idError: this.state.idError+ idError })
      isError = true;
    }
  
    //password empty error
    if (this.state.password==='') {
      passwordError = " password must not be empty";
      this.setState({ passwordError })
      isError = true;
    }
   
    return isError;
  
  };
  
  render() {
    if(this.state.redirect){
      return (<Redirect 
        to={{
            pathname: 'labmain',
            mydat: this.state.id
        }}
      
      />)

    }
    return (
      <form className="FormFields" onSubmit={this.handleSubmit}>
        <div className="FormField">
          <label className="FormField__Label" htmlFor="id"></label>
          <input type="text" id="id" className="FormField__Input" placeholder="Enter your Laboratory ID" name="id" value={this.state.id} onChange={this.handleChange} />
        </div>

        <div className="FormField">
          <label className="FormField__Label" htmlFor="password"></label>
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
