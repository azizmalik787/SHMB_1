import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
var id = 4000

const initialState = {

  name: "",
  password: "",
  confirmPassword: "",
  address: "",
  contactNumber: "",
  licenseNumber: "",
  nameError: "",
  passwordError: "",
  addressError: "",
  contactNumberError: "",
  licenseNumberError: ""

}

class SignUpForm extends Component {
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
  //before loading the page the id to be given is updated from the following function
  async componentDidMount() {
    if(id===4000){
      var clinicNumbers = { "$class": "org.example.empty.getClinicNumbers" }
    await axios.post('http://localhost:3000/api/getClinicNumbers', clinicNumbers)
      .then(res => {
        
          id = id + res.data
        
        
      })

    }
    
  }

  //on clicking the signup button of clinic the following module runs
  handleSubmit = event => {

    event.preventDefault()
    const isError = this.validate()
    if (isError === false) {
      this.registerClinic()
      this.setState({ initialState })
    }

  }
  async registerClinic() {
//clinic data gathering and API for registering clinic 
    var clinicData =
      { "$class": "org.example.empty.Clinic" }

    id = id + 1
    
    clinicData.clinicId = "C" + (id);
    clinicData.clinicName = this.state.name
    clinicData.password = this.state.password
    clinicData.registerationNumber = this.state.licenseNumber
    clinicData.address = this.state.address
    clinicData.phoneNo = this.state.contactNumber
    console.log(clinicData)
//API call 
    axios.post('http://localhost:3000/api/Clinic', clinicData)
      .then(res => {
        console.log(res.data);
        if(res.data.clinicId === clinicData.clinicId){
          this.setState({
            name: "",
            password: "",
            confirmPassword: "",
            address: "",
            contactNumber: "",
            licenseNumber: ""
          })
        }

      })

  }

  validate = () => {
    let isError = false;
    let nameError = "";
    let passwordError = "";
    let addressError = "";
    let contactNumberError = "";
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
    //phone length error
    if (this.state.contactNumber.length < 11) {
      contactNumberError = "Phone needs to be atleast 11 characters long";
      this.setState({ contactNumberError })
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
      <div>
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField" >
            <input type="text" className="FormField__Input" placeholder="Enter your Name" name="name" value={this.state.name} onChange={this.handleChange} />
          </div>

          <div className="FormField" >
            <input type="text" className="FormField__Input" placeholder="Enter your Address" name="address" value={this.state.address} onChange={this.handleChange} />
          </div>

          <div className="FormField" >
            <input type="tel" className="FormField__Input" placeholder="Enter your Contact Number" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <input type="text" className="FormField__Input" placeholder="Enter your License number" name="licenseNumber" value={this.state.licenseNumber} onChange={this.handleChange} />
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
      </div>
    );
  }
}

export default SignUpForm;
