import React, { Component } from 'react';
import HospitalLab from './HospitalLab'
import HospitalDoc from './HospitalDoc'
import { Navbar, Nav} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Hospitalmain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check: "doctor",
      idGiven: this.props.location.mydat,
      signout: false,
      addDoctor:false,
      addlab:false,
      changePass:false

    }
    //console.log(this.state.idGiven)
    this.ChangeCheckStatus = this.ChangeCheckStatus.bind(this);
    this.closeDoctorModal = this.closeDoctorModal.bind(this)
    this.DisplayFunction = this.DisplayFunction.bind(this)
  }


  DisplayFunction() {
    
    if (this.state.check === "doctor") {
      var hospid = this.state.idGiven

      return <HospitalDoc hospid={hospid}/>
    }
    else if (this.state.check === "lab"){
      var hid = this.state.idGiven
      return <HospitalLab hid={hid}/>
    }
    
  }

  ChangeCheckStatus(e) {
    if (e.target.name === "doctors") {
      this.setState({ check: "doctor" }); 
    }
    else if ( e.target.name === "labs") {
      this.setState({ check: "lab" }); 
    }
    if(e.target.name === "signout"){
   
      this.setState({signout:true})
    }
    if(e.target.name === "addDoctor"){
      
      this.setState({addDoctor:true})
    }
    if(e.target.name === "addLab"){
      this.setState({addlab:true})
    }
    if(e.target.name === "changePass"){
      this.setState({changePass:true})
    }

    this.DisplayFunction();
  }
  closeDoctorModal(){
   
    this.setState({addDoctor:false})
  }
  render() {

    if(this.state.signout){
      return (
        <Redirect to={''}/>
      )
    }
    if(this.state.changePass){
      return (<Redirect 
        to={{
            pathname: 'changepassword',
            mydat: {
              id: this.state.idGiven,
              category: "Hospital"
            }
        }}
      
      />)

    }
    if (this.state.addDoctor) {
      return (<Redirect
        to={{
          pathname: 'adddoctor',
          mydat: {
            id: this.state.idGiven,
            category: "Hospital"
          }
        }}

      />)

    }
    if (this.state.addlab) {

      return (<Redirect
        to={{
          pathname: 'addlaboratory',
          mydat: {
            id: this.state.idGiven,
            
          }
        }}

      />)

    }
    
    if(this.state.idGiven === undefined){
      return (
        <Redirect to={''}/>
      )
    }
    return (


      <div className="App__Aside">
        
        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Hospital Menu</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
            <Nav.Link name="doctors" onClick={this.ChangeCheckStatus} >Affiliated Doctors</Nav.Link>
            <Nav.Link name="labs" onClick={this.ChangeCheckStatus} >Affiliated Laboratories</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link  name ="addDoctor"  onClick={this.ChangeCheckStatus} >Add Doctor</Nav.Link>
            <Nav.Link   name ="addLab"  onClick={this.ChangeCheckStatus}  >Add Laboratory</Nav.Link>
            <Nav.Link name="changePass" onClick={this.ChangeCheckStatus}>Change Password</Nav.Link>
            <Nav.Link name="signout" onClick={this.ChangeCheckStatus}> Sign Out</Nav.Link>
          </Nav>
        </Navbar>

        {this.DisplayFunction()}
        
      </div>
    );
  }

}

export default Hospitalmain;