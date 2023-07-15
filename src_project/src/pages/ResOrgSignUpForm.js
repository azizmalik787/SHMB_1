import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
var id = 6000
const initialState = {

  name: "",
  password: "",
  confirmPassword: "",
  address: "",
  licenseNumber: "",
  nameError: "",
  passwordError: "",
  addressError: "",
  licenseNumberError: ""

}

class ResOrgSignUpForm extends Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value })
  }
  async componentDidMount() {
    var researchNumbers = { "$class": "org.example.empty.getResearchorgNumbers" }
    await axios.post('http://localhost:3000/api/getResearchorgNumbers', researchNumbers)
      .then(res => {
        id = id + res.data
      })
  }

  handleSubmit = event => {

    event.preventDefault()
    const isError = this.validate()
    if (isError === false) {

      this.registerResOrg()
      this.setState({ initialState })
    }


  }
  async registerResOrg() {

    var orgData =
      { "$class": "org.example.empty.Researchorganization" }

    id = id + 1
    orgData.orgId = "RO" + (id);
    orgData.orgName = this.state.name
    orgData.registerationNumber = this.state.licenseNumber
    orgData.password = this.state.password
    orgData.address = this.state.address

    console.log(orgData)
    await axios.post(`http://localhost:3000/api/Researchorganization`, orgData)
      .then(res => {
        console.log(res.data.status);
        if(res.data.orgId === orgData.orgId){
          this.setState({
            name: "",
            password: "",
            confirmPassword: "",
            address: "",
            licenseNumber: "",
            nameError: "",
            passwordError: "",
            addressError: "",
            licenseNumberError: ""

          })
        }

      })
  }
  validate = () => {
    let isError = false;
    let nameError = "";
    let passwordError = "";
    let addressError = "";
    let licenseNumberError = "";
    if (!this.state.name) {
      nameError = "Name field is Mendatory. ";
      this.setState({ nameError })
      isError = true;
    }
    else if (this.state.name.length < 5) {

      nameError = "Username needs to be atleast 5 characters long. ";
      this.setState({ nameError })
      isError = true;
    }
    //numbers in name error
    if (typeof this.state.name !== "undefined") {
      if (!this.state.name.match(/^[a-zA-Z]+$/)) {
        nameError.concat("Only letters are allowed");
        this.setState({ nameError })
        isError = true;
      }//blank space check 
    }
    //empty address error
    if (!this.state.address) {
      addressError = "Address is mendatory";
      this.setState({ addressError })
      isError = true;
    }

    //lic num error
    if (this.state.licenseNumber.length < 8) {
      licenseNumberError = " license needs to be atleast 8 characters long";
      this.setState({ licenseNumberError })
      isError = true;
    }
    //password empty error
    if (!this.state.password) {
      passwordError = " password must not be empty";
      this.setState({ passwordError })
      isError = true;
    }
    //password and confirm password error
    if (this.state.password !== this.state.confirmPassword) {
      passwordError = " password and confirm password do not match";
      this.setState({ passwordError });
      isError = true;
    }

    return isError;

  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="FormFields">
        <div className="FormField" >
          <input type="text" className="FormField__Input" placeholder="Enter your Name" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>

        <div className="FormField">
          <input type="text" className="FormField__Input" placeholder="Enter your Registration number" name="licenseNumber" value={this.state.licenseNumber} onChange={this.handleChange} />
        </div>

        <div className="FormField" >
          <input type="text" className="FormField__Input" placeholder="Enter your Address" name="address" value={this.state.address} onChange={this.handleChange} />
        </div>

        <div className="FormField">
          <input type="password" className="FormField__Input" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>

        <div className="FormField">
          <input type="password" className="FormField__Input" placeholder="Confirm your password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
        </div>

        <div className="FormField" id="signupbutton">
          <button className="FormField__Button " > Sign Up</button>

          <div id="h3" ><Link to="/">
            <h3 id="alreadyMember" >Already a member?</h3>
          </Link>
          </div>
        </div>
      </form>

    );
  }
}

export default ResOrgSignUpForm;
