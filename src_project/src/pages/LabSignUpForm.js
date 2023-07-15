import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

var id = 5000
//api may masla hai 

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

class LabSignUpForm extends Component {
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
    if(id===5000){
      var labNumbers = { "$class": "org.example.empty.getLabNumbers" }
    await axios.post('http://localhost:3000/api/getLabNumbers', labNumbers)
      .then(res => {
          id = id + res.data

      })

    }
    
  }


  handleSubmit = event => {

    event.preventDefault()
    const isError = this.validate()
    if (isError === false) {
//registering after validation
      this.registerLab()
      this.setState({ initialState })
    }
    else {
      console.log(this.state)
      console.log("Validation Error")
    }

  }
  async registerLab() {
//gathering lab data 
    var labData =
      { "$class": "org.example.empty.Lab" }

    id = id + 1
    labData.labId = "L" + (id)
    labData.labName = this.state.name
    labData.password = this.state.password
    labData.registerationNumber = this.state.licenseNumber
    labData.address = this.state.address

    //lab registering API   
    axios.post(`http://localhost:3000/api/Lab`, labData)
      .then(res => {
        console.log(res.data);
        if(res.data.labId === labData.labId){
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
      <div>
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

            <div id="h3" >
              <Link to="/">
                <h3 id="alreadyMember" >Already a member?</h3>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LabSignUpForm;
