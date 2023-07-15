import React, { Component } from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import RequestStatusDoctor from './RequestStatusDoctor'
import axios from 'axios';
import {db} from './firebase'

import 'bootstrap/dist/css/bootstrap.min.css'

class Doctormain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: this.props.location.mydat,
      signout: false,
      addPatient:false,
      addRecord:false,
      changePass:false,
      array:"",
      populateCheck:false,
      updatePatient:false,
      PatientId:"",
      show:false


    }
    //console.log(this.state.credentials)
    this.ChangeCheckStatus = this.ChangeCheckStatus.bind(this);
    this.admitPatient = this.admitPatient.bind(this)
    this.dischargePatient = this.dischargePatient.bind(this)
    this.addRecord = this.addRecord.bind(this)
    this.notifyPatient = this.notifyPatient.bind(this)
  }
  async dataFetcher(){
    
    await axios.get(`http://localhost:3000/api/Doctor/D2002`)//+ this.state.credentials.id )   //this.state.credentials.id)
    .then(res => {
      this.setState({ array: res.data })
    })
    return 
  }


   async componentDidMount() {
     if(this.state.credentials !== undefined){
      await this.dataFetcher()
    this.setState({ populateCheck: true })
     }
   
  }


  
 async ChangeCheckStatus(e) {
    if(e.target.name === "signout"){
      
      this.setState({signout:true})
     
    }
    else if(e.target.name === "addPatient"){
      
      this.setState({addPatient:true})
    }
    else if(e.target.name === "changePass"){
      this.setState({changePass:true})
    }
    else if(e.target.name === "requestStatus"){
      this.setState({show:true})
      
    }
    else if(e.target.name === "affiliatedPatients"){
      this.setState({show:false})
    }
    
  }
  getSecondPart(str) {
    return str.split('#')[1];
}
//changing patient status 
async admitPatient(e){
 //gathering data for changing status 
  var statusAdmit =
  {
    "$class": "org.example.empty.updatePatientStatus",
    "Patient": "resource:org.example.empty.Patient#"+ e.target.name,
    "newValue": "Admitted"
  }
//API for status admitting of patient
  await axios.post('http://localhost:3000/api/updatePatientStatus', statusAdmit)   //this.state.credentials.id)
      .then(res => {
        //console.log(res.data)
      })
}
async dischargePatient(e){
  //gathering data for changing status 
  
  var statusDischarged={
    "$class": "org.example.empty.updatePatientStatus",
    "Patient": "resource:org.example.empty.Patient#"+ e.target.name,
    "newValue": "Discharged"
  }
  //API for status admitting of patient
  await axios.post('http://localhost:3000/api/updatePatientStatus', statusDischarged )   //this.state.credentials.id)
      .then(res => {
        //console.log(res.data)
      })
}
//entering credentia;s to firebase to get permission from patient for viewing record
async notifyPatient(e){
  //firebase database collection name
    db.collection("DrPatient").add({
      doctorId: this.state.credentials.id ,
      patientId: e.target.name,
      category:"Doctor"
    });
}
addRecord(e){
  
  this.setState({PatientId: e.target.name})
  this.setState({addRecord:true})
 // console.log(this.state.credentials)
}
  populate(){
    if(this.state.populateCheck){
      var patients=[]
      if("myPatients" in this.state.array){
        for(var i=0 ; i<(this.state.array.myPatients.length) ;i++){
          patients.push(
            <div className="LabText" key={i}>
                <h1>Patient ID: {this.getSecondPart(this.state.array.myPatients[i])}
                      
                      <button key={"View"+i} onClick={this.notifyPatient} name= {this.getSecondPart(this.state.array.myPatients[i])} className="LabText_Button" >Request Record</button>
                      <button key={"Add"+i} onClick={this.addRecord} name= {this.getSecondPart(this.state.array.myPatients[i])} className="LabText_Button" >Add Record</button>
                      <button key={"Admit"+i} onClick={this.admitPatient} name={this.getSecondPart(this.state.array.myPatients[i])} className="LabText_Button">Status Admit</button>
                      <button key={"Discharge"+i} onClick={this.dischargePatient} name={this.getSecondPart(this.state.array.myPatients[i])} className="LabText_Button">Status Discharge</button>
                      
                      </h1>
                      <br/>
              </div>
          )
        }
        return patients
      }
      return (<h1  >No Registered Patients</h1>)
   

    }
    
    
  }
  DisplayFunction(){
    if(this.state.show){
      
        //id transfer 
        const id = {
          id:this.state.credentials.id,
          HCId: this.state.credentials.HCId
        }
        
        return  <RequestStatusDoctor id={id}/>
      
    }
    else{
      return (
        <div className="PatientInfoForm">
        <h1>Affiliated Patients</h1>
        <div className="PatientBoxBorder">

        {this.populate()}
            
        </div>
      </div>
      )

    }
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
              id:   this.state.credentials.id,
              HCId: this.state.credentials.HCId,
              category: "Doctor"
            }
        }}
      
      />)

    }
    if(this.state.addRecord){
      return (<Redirect 
        to={{
            pathname: 'addmedicalrecord',
            mydat: {
              id:   this.state.credentials.id,
              category: "Doctor",
              hospId: this.state.credentials.HCId,
              patientId: this.state.PatientId

            }
        }}
      
      />)

    }
    if (this.state.addPatient) {
      return (<Redirect
        to={{
          pathname: 'addpatient',
          mydat: {
            id: this.state.credentials.id,
            category: "Doctor",
            hospId: this.state.credentials.HCId
          }
        }}

      />)

    }
    
    if(this.state.credentials === undefined){
      return (
        <Redirect to={''}/>
      )
    }
    return (


      <div className="App__Aside">
        
        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Doctor Menu</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          <Nav.Link name="affiliatedPatients" onClick={this.ChangeCheckStatus} >Affiliated Patients</Nav.Link>
          <Nav.Link name="requestStatus" onClick={this.ChangeCheckStatus} >Request Status</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link  name ="addPatient"  onClick={this.ChangeCheckStatus} >Add Patient</Nav.Link>
            <Nav.Link >Contact Us</Nav.Link>
            <Nav.Link >About</Nav.Link>
            <Nav.Link name="changePass" onClick={this.ChangeCheckStatus}>Change Password</Nav.Link>
            <Nav.Link name="signout" onClick={this.ChangeCheckStatus}> Sign Out</Nav.Link>
          </Nav>
        </Navbar>
        {this.DisplayFunction()}
        
       
        
      

        
      </div>
    );
  }

}

export default Doctormain;