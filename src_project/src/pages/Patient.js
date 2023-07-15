import React, { Component } from 'react';
import PersonalInfo from './PatientPersonalInfo'
import PatientHistory from './PatientHistory'
import RequestsToPatient from './RequestsToPatient'
import PatientTestReports from './PatientTestReports'
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';




class Patient extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      show: "personalInfo",
      idGiven:this.props.location.mydat,
      changePass:false,
      report:''
      
    }
    this.ChangeCheckStatus = this.ChangeCheckStatus.bind(this);
  }
  
  DisplayFunction() {
    if (this.state.show === "personalInfo") {
      const pid= this.state.idGiven
      
      return <PersonalInfo pid={pid}/>
    }
    else if (this.state.show === "history") {
      const pid= this.state.idGiven
      
      return <PatientHistory pid={pid}/>
    }
    else if (this.state.show === "doctorRequests") {
      const pid= this.state.idGiven
      
      return <RequestsToPatient pid={pid}/>
    }
    else if (this.state.show === "reports") {
      
      const pid= this.state.idGiven
      return <PatientTestReports pid={pid} />
    }
  }
  ChangeCheckStatus(e) {
    if (e.target.name === "personal") {
      this.setState({ show: "personalInfo" });
    }
    else if(e.target.name === "history"){
      this.setState({ show: "history" });
    }
    else if (e.target.name === "doctorRequests"){
      this.setState({ show: "doctorRequests" });
    }
    else if (e.target.name === "reports"){
      this.setState({ show: "reports" });
    }
    else if(e.target.name === "changePass"){
      this.setState({changePass:true})
    }
    
  }



  render() {
    if(this.state.idGiven=== undefined){
      return (<Redirect 
        to={{
            pathname: '',
        }}
      
      />)

    }
    
   if(this.state.changePass){
    return (<Redirect 
      to={{
          pathname: 'changepassword',
          mydat: {
            id: this.state.idGiven,
            category: "Patient"
          }
      }}
    
    />)

  }
    return (
      <div className="App__Aside">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <h1>Patient Menu</h1>
          </Navbar.Brand>
          {
            //nav bar for placing items on left side, left empty 
          }
          <Nav className="mr-auto mynav">
          <Nav.Link name="doctorRequests" onClick={this.ChangeCheckStatus}>Doctor Requests</Nav.Link>
          </Nav>
          <Nav>

            <Nav.Link name="personal" onClick={this.ChangeCheckStatus}>Patient Personal Info</Nav.Link>
            <Nav.Link name="history" onClick={this.ChangeCheckStatus}>Patient History</Nav.Link>
            <Nav.Link name="reports" onClick={this.ChangeCheckStatus}>Patient Medical Reports</Nav.Link>
            <Nav.Link name="changePass" onClick={this.ChangeCheckStatus}>Change Password</Nav.Link>
            <Nav.Link href="#/">Sign Out</Nav.Link>
          </Nav>
        </Navbar>
        <div>
          {this.DisplayFunction() }
          {/*<img src={this.state.report.reportbase64}></img>*/}
        </div>
      </div>

    );
  }
}

export default Patient;
