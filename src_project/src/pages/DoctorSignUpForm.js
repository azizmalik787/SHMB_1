import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'


var id = 2000
const initialState = {

  name: "",
  password: "",
  regNumber: "",
  gender: "",
  age: "",
  address: "",
  contactNumber: "",
  confirmPassword: "",
  specialization: "",
  nameError: "",
  passwordError: "",
  regNumberError: "",
  addressError: "",
  ageError: "",
  contactNumberError: "",
  specializationError: ""

}
class DoctorSignUpForm extends Component {
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
    if(id===2000){
      var doctorNumbers = { "$class": "org.example.empty.getDoctorNumbers" }
    await axios.post('http://localhost:3000/api/getDoctorNumbers', doctorNumbers)
      .then(res => {
        
          id = id + res.data
    

      })

    }
    
  }
  handleSubmit = event => {

    event.preventDefault()
    const isError = this.validate()
    if (isError === false) {
      this.registerDoctor()
      this.setState({ initialState })
    }
    else {
      console.log("ERROR validation")
      console.log(this.state)
    }

  }
  
  async registerDoctor() {
    //gathering doctor  data from the UI form 
    var doctorData =
      { "$class": "org.example.empty.Doctor" }

    id = id + 1
    doctorData.doctorId = "D" + (id);
    doctorData.doctorName = this.state.name
    doctorData.password = this.state.password
    doctorData.gender = this.state.gender
    doctorData.age = this.state.age
    doctorData.registerationNumber = this.state.regNumber
    doctorData.address = this.state.address
    doctorData.phoneNo = this.state.contactNumber
    doctorData.specialization = this.state.specialization
    //registering doctor from API call to blockchain 
    await axios.post('http://localhost:3000/api/Doctor', doctorData)
      .then(res => {
        if(res.data.doctorId === doctorData.doctorId){
          this.setState({
            name: "",
            password: "",
            regNumber: "",
            gender: "",
            age: "",
            address: "",
            contactNumber: "",
            confirmPassword: "",
            specialization: ""

          })
        }

      })

  }

  validate = () => {
    let isError = false;
    let nameError = "";
    let passwordError = "";
    let regNumberError = "";
    let addressError = "";
    let ageError = "";
    let contactNumberError = "";
    let specializationError = "";
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
      if (!this.state.name.match(/^[a-zA-Z]+ /)) {
        nameError.concat("Only letters are allowed");
        this.setState({ nameError })
        isError = true;
      }//blank space check 
    }

    //reg num error
    if (this.state.regNumber.length < 8) {
      regNumberError = " registration number needs to be atleast 8 characters long";
      this.setState({ regNumberError })
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
    //specialization error
    if (!this.state.specialization) {
      specializationError = "Specialization field is Mendatory. ";
      this.setState({ specializationError })
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

          <div className="FormField">
            <input type="text" className="FormField__Input" placeholder="Enter your Registration number" name="regNumber" value={this.state.regNumber} onChange={this.handleChange} />
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
          <div className="FormField" >
            <input type="text" className="FormField__Input" placeholder="Enter your Specialization" name="specialization" value={this.state.specialization} onChange={this.handleChange} />
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

export default DoctorSignUpForm;
