import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HospitalSignUpForm from './HospitalSignUpForm';
import DoctorSignUpForm from './DoctorSignUpForm';
import ClinicSignUpForm from './ClinicSignUpForm';
import LabSignUpForm from './LabSignUpForm';
import ResOrgSignUpForm from './ResOrgSignUpForm';
import PatientSignUpForm from './PatientSignUpForm';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDropdown:"0",
        }
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
    
    }
    
    
    handleDropdownChange(e) {
        var check = e.target.value; //temp variable for storing check value
        this.setState({ selectedDropdown: check }); //check select value
    }

   

    selectOption(e) {
        return (
            <div className="Selection_Form">
                <select defaultValue={'0'} className="Center_Dropdown" id="dropdown" onChange={this.handleDropdownChange}>
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
    displayFunction(e){
        var check = this.state.selectedDropdown
        
        if (check === '0') {
            return(<div className="FormField">
                <h1>Kindly Choose the category to Signup</h1>
                <br/>

        <Link to="/" className="FormField__Link"><h2 id="alreadyMember">Already a Member? Login</h2></Link>
        
            </div>)
        }
        else if (check === '1') {
            return(<HospitalSignUpForm/>)
        }
        else if (check === '2') {
            return(<DoctorSignUpForm/>)
        }
        else if (check === '3') {
            return(<ClinicSignUpForm/>)
        }
        else if (check === '4') {
            return(<LabSignUpForm/>)
        }
        else if (check === '5') {
            
            return(<ResOrgSignUpForm/>)
            
        }
        else if (check === '6') {
            return(<PatientSignUpForm/>)
            
        }
    }
    //font bold krna hai formtitle ka 
    render() {
        return (
            <div className="App__Aside">
                 <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <h1>Signup Menu</h1>
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
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="FormCenter">
                        
                        {this.selectOption()}

                        {this.displayFunction()}
                        
                    </div>


                </div>
            </div>
        );
    }
}

export default SignUp;
