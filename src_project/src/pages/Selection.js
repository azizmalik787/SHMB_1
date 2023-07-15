import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import HospitalLoginForm from './HospitalLogin';
import DoctorLoginForm from './DoctorLogin';
import ClinicLoginForm from './ClinicLogin';
import LabLoginForm from './LabLogin';
import ResOrgLoginForm from './ResearchOrganizationLogin';
import PatientLoginForm from './PatientLogin';



class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "0"
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }



  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  displayFunction(e) {
    var check = this.state.selectValue;

    if (check === '0') {
      return (<div className="FormField"><h1>Select to proceed further</h1>
                <Link to="/signup" className="FormField__Link"><h2 id="alreadyMember" >Create an account</h2></Link>
        
      </div>)
    }
    else if (check === '1') {
      return (<HospitalLoginForm />)
    }
    else if (check === '2') {
      return(<DoctorLoginForm/>)
  }
  else if (check === '3') {
      return(<ClinicLoginForm/>)
  }
  else if (check === '4') {
      return(<LabLoginForm/>)
  }
  else if (check === '5') {
      
      return(<ResOrgLoginForm/>)
      
  }
  else if (check === '6') {
      return(<PatientLoginForm/>)
      
  }
  }

  selectionFunction() {
    return (
      <div >
        <select defaultValue={"0"} className="Center_Dropdown" id="dropdown" onChange={this.handleDropdownChange}>
          <option value="0">Select Position</option>
          <option value="1">Hospital</option>
          <option value="2">Doctor</option>
          <option value="3">Clinic</option>
          <option value="4">Laboratory</option>
          <option value="5">Research Org</option>
          <option value="6">Patient</option>
        </select>

      </div>
    )
  }
  render() {

    return (
      <div className="App__Aside">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <h1>Login Menu</h1>
          </Navbar.Brand>
          {
            //nav bar for placing items on left side, left empty 
          }
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>

          </Nav>
        </Navbar>
        <div className="App__Form">
          <div className="FormTitle">
            <h1> User Account</h1>
            {this.selectionFunction()}
          </div>

          {this.displayFunction()}


          

        </div>
        <div>
        
        </div>
      </div>
    );
  }
}

export default SignUpForm;
