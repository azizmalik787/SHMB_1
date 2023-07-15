import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios'


class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted:false,
      pre_password: '',
      new_password: '',
      confirm: '',
      passwordError: "",
      login: false,
      loginError: false,
      credentials: this.props.location.mydat,

      patientRedirect: false,
      doctorRedirect: false,
      hospitalRedirect: false,
      labRedirect: false,
      researchRedirect: false,
      clinicRedirect: false

    };
    console.log(this.state.credentials)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this)
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
    //validation Checking for empty fields 
    if (isError === false) {
      console.log('The form was submitted with the following data:');
      this.setState(this.state)
      var data = {
        "$class": "org.example.empty.login",
        "userid": this.state.credentials.id,
        "userpassword": this.state.pre_password,
        "usertype": this.state.credentials.category
      }

      console.log(data)
      var loginResponse
      //checkiing the password given is valid or not 
      await axios.post('http://localhost:3000/api/login', data)
        .then((response) => {
          console.log(response.data);
          loginResponse = response.data
        });
      var passwordResponse
      //if valid then changing the password 
      if (loginResponse === "successful") {
        //all 6 same till there 
        
        if (this.state.credentials.category === "Hospital") {
          var hospitalData = {
            "$class": "org.example.empty.updateHospitalPassword",
            "Hospital": "resource:org.example.empty.Hospital#" + this.state.credentials.id,
            "newPass": this.state.new_password
          }
          
        //API for update password 
        await axios.post('http://localhost:3000/api/updateHospitalPassword', hospitalData)
          .then((response) => {
            console.log("I am from update password:")
            console.log(response.data);
            passwordResponse = response.data
          });
        if (passwordResponse === "Update successful") {
          this.setState({ login: true })
        }
        
        }
        else if (this.state.credentials.category === "Doctor") {
          var doctorData = {
            "$class": "org.example.empty.updateDoctorPassword",
            "Doctor": "resource:org.example.empty.Doctor#" + this.state.credentials.id,
            "newPass": this.state.new_password
        }
        //API for update password 
        await axios.post('http://localhost:3000/api/updateDoctorPassword', doctorData)
          .then((response) => {
            console.log("I am from update password:")
            console.log(response.data);
            passwordResponse = response.data
          });
        if (passwordResponse === "Update successful") {
          this.setState({ login: true })
        }
          
        }
        else if (this.state.credentials.category === "Clinic") {
          var clinicData = {
              "$class": "org.example.empty.updateClinicPassword",
              "Clinic": "resource:org.example.empty.Clinic#" +this.state.credentials.id,
              "newPass": this.state.new_password  
          }
          //API for update password 
          await axios.post('http://localhost:3000/api/updateClinicPassword', clinicData)
            .then((response) => {
              console.log("I am from update password:")
              console.log(response.data);
              passwordResponse = response.data
            });
          if (passwordResponse === "Update successful") {
            this.setState({ login: true })
          }
          
        }
        else if (this.state.credentials.category === "Laboratory") {

          var labData = {
            "$class": "org.example.empty.updateLabPassword",
            "Lab": "resource:org.example.empty.Lab#" +this.state.credentials.id ,
            "newPass": this.state.new_password 
          }

        //API for update password 
        await axios.post('http://localhost:3000/api/updateLabPassword', labData)
          .then((response) => {
            console.log("I am from update password:")
            console.log(response.data);
            passwordResponse = response.data
          });
        if (passwordResponse === "Update successful") {
          this.setState({ login: true })
        }
        }
        else if (this.state.credentials.category === "Researchorganization") {
          var researchData = {
            "$class": "org.example.empty.updateResearchorgPassword",
            "Org": "resource:org.example.empty.Researchorganization#"+this.state.credentials.id,
            "newPass": this.state.new_password
          }

        //API for update password 
        await axios.post('http://localhost:3000/api/updateResearchorgPassword', researchData)
          .then((response) => {
            console.log("I am from update password:")
            console.log(response.data);
            passwordResponse = response.data
          });
        if (passwordResponse === "Update successful") {
          this.setState({ login: true })
        }
          
        }
        else if (this.state.credentials.category === "Patient") {
          var patientData = {
            "$class": "org.example.empty.updatePatientPassword",
            "Patient": ("resource:org.example.empty.Patient#" + this.state.credentials.id),
            "newPass": this.state.new_password
          }
          //API for update password 
          await axios.post('http://localhost:3000/api/updatePatientPassword', patientData)
            .then((response) => {
              console.log("I am from update password:")
              console.log(response.data);
              passwordResponse = response.data
            });
          if (passwordResponse === "Update successful") {
            this.setState({ login: true })
          }
        }


      }//successful login if condition 


    }
    //validation error 
    else {
      console.log("error in validation")
      this.setState({
        loginError: true,
        pre_password: "",
        new_password: "",
        confirm: "",
        passwordError: "",
        login: false,

      })
    }

  }
  validate = () => {
    let isError = false;
    let passwordError = "";

    //password empty error
    if (!this.state.pre_password) {
      passwordError = " password must not be empty";
      this.setState({ passwordError })
      isError = true;
    }
    //password empty error
    if (!this.state.new_password) {
      passwordError = " password must not be empty";
      this.setState({ passwordError })
      isError = true;
    }
    //password and confirm password error
    if (this.state.new_password !== this.state.confirm) {
      passwordError = "new password and confirm password do not match";
      this.setState({ passwordError });
      isError = true;
    }

    return isError;
  };
  goBack() {
    if (this.state.credentials.category === "Hospital") {
      this.setState({ hospitalRedirect: true })
    }
    else if (this.state.credentials.category === "Doctor") {
      this.setState({ doctorRedirect: true })
    }
    else if (this.state.credentials.category === "Clinic") {
      this.setState({ clinicRedirect: true })
    }
    else if (this.state.credentials.category === "Laboratory") {
      this.setState({ labRedirect: true })
    }
    else if (this.state.credentials.category === "Researchorganization") {
      this.setState({ researchRedirect: true })
    }
    else if (this.state.credentials.category === "Patient") {
      this.setState({ patientRedirect: true })
    }
    return
  }
  errorLogin() {
    if (this.state.loginError) {
      return (<h3>Invalid Credentials Error. Could not update Password</h3>)
    }

  }
  render() {
    //redirect to Re-Login after successful update
    if (this.state.login) {
      console.log("login true")
      return (

        <Redirect 
        to={{
          pathname:''
        }} />
      )
    }
    if (this.state.patientRedirect) {
      return (<Redirect
        to={{
          pathname: 'patient',
          mydat: this.state.credentials.id
        }}

      />)

    }
    if (this.state.hospitalRedirect) {
      return (<Redirect
        to={{
          pathname: 'hospital',
          mydat: this.state.credentials.id,

        }}

      />)

    }
    if (this.state.doctorRedirect) {
      return (<Redirect
        to={{
          pathname: 'doctor',
          mydat: {
            id: this.state.credentials.id,
            HCId: this.state.credentials.HCId
          }
        }}

      />)

    }

    if (this.state.researchRedirect) {
      return (<Redirect
        to={{
          pathname: 'researchorg',
          mydat: this.state.credentials.id
        }}

      />)

    }
    if (this.state.clinicRedirect) {
      return (<Redirect
        to={{
          pathname: 'clinic',
          mydat: this.state.credentials.id
        }}

      />)

    }
    if (this.state.labRedirect) {
      return (<Redirect
        to={{
          pathname: 'labmain',
          mydat: this.state.credentials.id
        }}

      />)

    }
    return (
      <div className="App__Aside">
        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Change Password</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>

          </Nav>
        </Navbar>
        <div className="User_Form">


          <div className="FormTitle">
            <h1>Change Your Password Here</h1>
          </div>

          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="pre_password"></label>
                <input type="password" id="pre_password" className="FormField__Input" placeholder="Enter Previous Password" name="pre_password" value={this.state.pre_password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="new_password"></label>
                <input type="password" id="new_password" className="FormField__Input" placeholder="Enter New Password" name="new_password" value={this.state.new_password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="confirm"></label>
                <input type="password" id="confirm" className="FormField__Input" placeholder="Confirm Password" name="confirm" value={this.state.confirm} onChange={this.handleChange} />
              </div>


            </form>
            <div className="FormField">
              <button className="FormField__Button mr-20" onClick={this.goBack}>Back</button>
              <button type="submit" onClick={this.handleSubmit} className="FormField__Button mr-20">Update</button>

              {this.errorLogin()}


            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default ChangePassword;
