import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
var id = 3000

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

class HospitalSignUpForm extends Component {

   constructor(props) {
      super(props);

      this.state = initialState;

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }



   handleChange = event => {
      event.preventDefault();

      this.setState({ [event.target.name]: event.target.value })
   }
   async componentDidMount() {
      if(id === 3000){
         var hospitalNumbers = { "$class": "org.example.empty.getHospitalNumbers" }
      await axios.post('http://localhost:3000/api/getHospitalNumbers', hospitalNumbers)
         .then(res => {
            
               id = id + res.data
            
         })

      }
      
   }

   handleSubmit = async event => {

      event.preventDefault()
      const isError = this.validate()
      if (isError === false) {

//gathering data after validating it 
         var hospitalData =
            { "$class": "org.example.empty.Hospital" }

         id = id + 1
         hospitalData.hospitalId = 'H' + id
         hospitalData.hospitalName = this.state.name
         hospitalData.password = this.state.password
         hospitalData.registerationNumber = this.state.licenseNumber
         hospitalData.address = this.state.address
         hospitalData.phoneNo = this.state.contactNumber

         //api call to add Hospital to blockchain 
         await axios.post('http://localhost:3000/api/Hospital', hospitalData)
            .then(res => {
              //cleariing form on sccessful signup 
               if (res.data.hospitalId === hospitalData.hospitalId) {
                  this.setState(
                     {
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
                  )
               }

            })



      }
      else {
         console.log("Validation Error")
      }

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
         passwordError = " password and confirm passwrd do not match";
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
                  <input type="password" className="FormField__Input" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.handleChange} />
               </div>

               <div className="FormField">
                  <input type="password" className="FormField__Input" placeholder="Confirm your password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
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
               <div className="FormField" id="signupbutton">
                  <button type="submit" className="FormField__Button " > Sign Up</button>
               </div>
            </form>
            <div className="FormField" ><Link to="/">
               <h3 id="alreadyMember" >Already a member?</h3>
            </Link>
            </div>
         </div>
      );
   }
}

export default HospitalSignUpForm;
