import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
var id = 100;

const initialState = {

  name: "",
  password: "",
  confirmPassword: "",
  address: "",
  contactNumber: "",
  cnicNumber: "",
  gender: "",
  age: "",
  nameError: "",
  passwordError: "",
  addressError: "",
  contactNumberError: "",
  licenseNumberError: "",
  cnicError: "",
  ageError: "",
  genderError: ""

}

class PatientSignUpForm extends Component {
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
  
    var patientNumbers = { "$class": "org.example.empty.getPatientNumbers" }
    await axios.post('http://localhost:3000/api/getPatientNumbers', patientNumbers)
      .then(res => {
        id = id + res.data
      })

  }

  handleSubmit = event => {

    event.preventDefault()
    const isError = this.validate()
    if (isError === false) {
      this.registerPatient()
      this.setState({ initialState })
    }

  }

  async registerPatient() {
//registering patient 
    var patientData =
      { "$class": "org.example.empty.Patient" }
//gathering data 
    id = id + 1
    patientData.patientId = "P" + (id);
    patientData.patientName = this.state.name
    patientData.gender = this.state.gender
    patientData.password = this.state.password
    patientData.age = this.state.age
    patientData.cnic = this.state.cnicNumber
    patientData.address = this.state.address
    patientData.status = "Admitted"
    patientData.phoneNo = this.state.contactNumber
    console.log(patientData);
    //API call
    axios.post(`http://localhost:3000/api/Patient`, patientData)
      .then(res => {
        console.log(res.data);
        if(res.data.patientId === patientData.patientId){
          this.setState({
            name: "",
            password: "",
            confirmPassword: "",
            address: "",
            contactNumber: "",
            cnicNumber: "",
            gender: "",
            age: "",
            nameError: "",
            passwordError: "",
            addressError: "",
            contactNumberError: "",
            licenseNumberError: "",
            cnicError: "",
            ageError: "",
            genderError: ""

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
    let cnicError = "";
    let ageError = "";
    let genderError = "";
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
    //cnic num error
    if (this.state.cnicNumber.length < 13) {
      cnicError = " license needs to be atleast 8 characters long";
      this.setState({ cnicError })
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
    //gender error
    if (!this.state.gender) {
      genderError = "Gender field is Mendatory. ";
      this.setState({ genderError })
      isError = true;
    }
    //age error
    if (!this.state.age) {
      ageError = "Age field is Mendatory. ";
      this.setState({ ageError })
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
          <input type="text" className="FormField__Input" placeholder="Enter your CNIC number" name="cnicNumber" value={this.state.cnicNumber} onChange={this.handleChange} />
        </div>
        <div className="FormField">
          <input type="tel" className="FormField__Input" placeholder="Enter your Age" name="age" value={this.state.age} onChange={this.handleChange} />
        </div>
        <div className="FormField">
          <input type="text" className="FormField__Input" placeholder="Enter your Gender" name="gender" value={this.state.gender} onChange={this.handleChange} />
        </div>

        <div className="FormField">
          <input type="text" className="FormField__Input" placeholder="Enter your Address" name="address" value={this.state.address} onChange={this.handleChange} />
        </div>
        <div className="FormField" >
          <input type="tel" className="FormField__Input" placeholder="Enter your Contact Number" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} />
        </div>
        <div className="FormField">
          <input type="password" className="FormField__Input" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>
        <div className="FormField">
          <input type="password" className="FormField__Input" placeholder="Confirm your password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
        </div>
        <div className="FormField" id="signupbutton">
          <button className="FormField__Button " > Sign Up</button>

          <div id="h3" >
            <Link to="/">
              <h3 id="alreadyMember" >Already a member?</h3>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

export default PatientSignUpForm;
