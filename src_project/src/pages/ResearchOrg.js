import React, { Component } from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import {db} from './firebase'
import 'bootstrap/dist/css/bootstrap.min.css'

class ResearchOrg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idGiven: this.props.location.mydat,
      signout: false,
      addHospital:false,
      changePass:false,
      populateCheck:false,
      array:null,
      requestsView:false,
      requestArray:null,
      requestIds:null,
      viewMedicalRecord:false,
      patientId:null

    }
    //console.log(this.state.idGiven)
    this.ChangeCheckStatus = this.ChangeCheckStatus.bind(this);
    this.notifyPatients = this.notifyPatients.bind(this)
    this.acceptviewPatient = this.acceptviewPatient.bind(this)
  }
  //organization data fetcher
  async dataFetcher(){
    
    await axios.get(`http://localhost:3000/api/Researchorganization/` + this.state.idGiven )  
    .then(res => {
      this.setState({ array: res.data })
    }).catch()
    return 
  }
//firebase requests fetcher
  async fetchRequests(){
    await db.collection('PtOrganization')
    .get()
    .then(
        snapshot =>{
            
            const requests=[]
            const ids=[]
            snapshot.forEach( doc=>{
                const data = doc.data()
                const id = doc.id
                requests.push(data)
                ids.push(id)
            })
            this.setState({requestArray:requests})
            this.setState({requestIds:ids})
        }
    )
    .catch(error => console.log(error))
    
  }

  async componentDidMount() {
    if(this.state.idGiven !== undefined){
      //organization data update 
     await this.dataFetcher()
     
     this.setState({ populateCheck: true })
     //request update 
     await this.fetchRequests()

    }
    

   }

  
  ChangeCheckStatus(e) {
    if(e.target.name === "signout"){
      
      this.setState({signout:true})
     
    }
    if(e.target.name === "addHospital"){
      
      this.setState({addHospital:true})
    }
    if(e.target.name === "changePass"){
      this.setState({changePass:true})
    }
    if(e.target.name === "requests"){
      this.setState({requestsView:true})
    }
    if(e.target.name === "hospitals"){
      this.setState({requestsView:false})
    }
  }
  getSecondPart(str) {
    return str.split('#')[1];
  }
 
  async notifyPatients(e){
    var doctorData = {
      "$class": "org.example.empty.researchOrgDoctorList",
      "Hospital": e.target.name
    }
    
    var doctors=[]
    //getting doctor list
    await axios.post('http://localhost:3000/api/researchOrgDoctorList',doctorData) 
    .then(res => {
      doctors= res.data 
    });
    //doctors has all the doctors affiliated to that hospital

    var patients=[]
    var temppatient
     
    for (var i = 0; i < doctors.length; i++) {

      //api call is returning doctor data along with the patients registered 
      await axios.get('http://localhost:3000/api/Doctor/' + doctors[i])
        .then(res => {
          temppatient = res.data
        });
      //checking if doctor has any patients registered 
      if ("myPatients" in temppatient) {
        //making array of all patients of all doctors affiliated to hospital
        for (var j = 0; j < temppatient.myPatients.length; j++) {
          patients.push({
            doctorId: doctors[i],
            patientId: this.getSecondPart(temppatient.myPatients[j])
          })
        }
      }

    }
    //collected patients and doctor ids in patients array
    for(var k =0 ; k < patients.length;k++){
      db.collection("DrPatient").add({
        organizationId:this.state.idGiven ,
        patientId: patients[k].patientId,
        category:"Hospital"
      });
    }

    //send to fire base

  }
  populate(start){
    if(this.state.populateCheck){
      var hospitals=[]
      if("myHospitals" in this.state.array){
        for(var i=start ; i<(this.state.array.myHospitals.length) ;i+=2){
          hospitals.push(
            <div className="LabText" key={i}>
                <h1>Hospital ID: {this.getSecondPart(this.state.array.myHospitals[i])}
                      
                      <button key={"Request"+i} onClick={this.notifyPatients} name= {this.getSecondPart(this.state.array.myHospitals[i])} className="LabText_Button" >Request Record</button>
                      
                      </h1>
                      <br/>
              </div>
          )
        }
        return hospitals
      }
      if(start===0){
      return (<h1  >No Registered Hospitals</h1>)
      }
   

    }
  }
  acceptviewPatient(e){
    
    this.setState({
      patientId: e.target.name
    })
    this.setState({viewMedicalRecord:true})
    return 
  }
  populateRequests(initial){
    if(this.state.requestArray.length>0){
      var reqArr=[]
      for(var i = initial ;i<this.state.requestArray.length;i+=2){
        if(this.state.requestArray[i].organizationId === this.state.idGiven){
          reqArr.push(
            <div className="LabText" key={i}>
              
              <h1>Patient ID: {this.state.requestArray[i].patientId}
              <button key={"Accept"+i} onClick={this.acceptviewPatient} name= {this.state.requestArray[i].patientId} className="LabText_Button" >View</button>
                              
              </h1>
              <br/>
  
            </div>
          )

        }
      }
      if(reqArr.length===0){
        return(
          <h2>No Requests Data Available</h2>
        )
      }
      else{
        return reqArr;
      }
    }
    else if(initial===0) {
      return(
        <h2>No Requests Data Available</h2>
      )
      
    }
    
  }
  DisplayFunction(){
    if(this.state.requestsView){
      
      return (
        <div className="PatientInfoForm">
          <h1>  Requests Status</h1>
          <div className="PatientBoxBorder">
            <div id="content">
              <div id="left">
                {this.populateRequests(0)}
              </div>

              <div id="right">
                {this.populateRequests(1)}
              </div>
            </div>
          </div>
        </div>
        
      )

    }
    else {
      return(
        <div className="PatientInfoForm">
          <h1>Affiliated Hospitals</h1>
          <div className="PatientBoxBorder">
            <div id="content">
              <div id="left">
                {this.populate(0)}
              </div>

              <div id="right">
                {this.populate(1)}
              </div>
            </div>
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
    if(this.state.idGiven===undefined){
      return (
        <Redirect to={''}/>
      )
    }
    if(this.state.viewMedicalRecord){//set redirect
      return (<Redirect 
        to={{
            pathname: 'viewmed',
            mydat: {
              id:   this.state.idGiven,
              patientId: this.state.patientId,
            }
        }}
      
      />)

    }
    if(this.state.changePass){
      return (<Redirect 
        to={{
            pathname: 'changepassword',
            mydat: {
              researchId: this.state.idGiven,
              category: "Researchorganization"
            }
        }}
      
      />)

    }
    if (this.state.addHospital) {
      return (<Redirect
        to={{
          pathname: 'addhospital',
          mydat: {
            id: this.state.idGiven,
            category: "ResearchOrganization"
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
            <h1>Research Organization Menu</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          <Nav.Link  name ="hospitals"  onClick={this.ChangeCheckStatus} >Affiliated Hospitals</Nav.Link>
          <Nav.Link  name ="requests"  onClick={this.ChangeCheckStatus} >Requested Data Status</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link  name ="addHospital"  onClick={this.ChangeCheckStatus} >Add Hospital</Nav.Link>
            
            <Nav.Link name="changePass" onClick={this.ChangeCheckStatus}>Change Password</Nav.Link>
            <Nav.Link name="signout" onClick={this.ChangeCheckStatus}> Sign Out</Nav.Link>
          </Nav>
        </Navbar>
        {this.DisplayFunction()}

       
        

        
      </div>
    );
  }

}

export default ResearchOrg;