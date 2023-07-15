import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import {db} from './firebase'



class RequestStatusDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        populateCheck:false,
        array:'',
        requestIds:'',
        redirect:false,
        patientId:''
      
    };
    this.acceptviewDoctor = this.acceptviewDoctor.bind(this)
    this.rejectviewDoctor = this.rejectviewDoctor.bind(this)
    this.acceptrequestHospital = this.acceptrequestHospital.bind(this)
    this.rejectrequestHospital = this.rejectrequestHospital.bind(this)
    this.fetchData = this.fetchData.bind(this)

    console.log("receiving data" + this.props.id)
    console.log(this.props.id)

  }
  async fetchData(){
    await db.collection('PtDoctor')
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
            this.setState({array:requests})
            this.setState({requestIds:ids})
            console.log(this.state.array)
        }
    )
    .catch(error => console.log(error))


  }
  async componentDidMount() {
    await this.fetchData()
    this.setState({ populateCheck: true })
  }
  async acceptviewDoctor(e){
      //update patient id
     this.setState({patientId: this.state.array[e.target.name].patientId})
     console.log(this.state.patientId) 
      //delete from firebase 
      const requestId = this.state.requestIds[e.target.name]
      await db.collection('PtDoctor').doc(requestId).delete();
     
      //fetch data 
      await this.fetchData()
      
      //populate true for repopulation 
      this.setState({populateCheck:true })
      //redirect to new page
      this.setState({redirect:true})

      console.log("Insert View of Doctor viewing patient data")

  }
 async rejectviewDoctor(e){
      //delete from firebase 
      const requestId = this.state.requestIds[e.target.name]
      db.collection('PtDoctor').doc(requestId).delete();
      
      //fetch data 
      await this.fetchData()
      
      //populate true 
      this.setState({populateCheck:true })

  }
  acceptrequestHospital(){

  }
  rejectrequestHospital(){

  }
  hospitalsRequests() {
      
    if (this.state.populateCheck) {
      var hospitalrequests=[]

    for(var i=0 ; i<this.state.array.length ;i+=1){
        //index number is being sent in the name of button to retrieve data from the array in state 
        if(this.state.array[i].category === "Hospital"){
            hospitalrequests.push(
            
                <div className="LabText" key={i}>
                        <h2>Doctor ID: {this.state.array[i].doctorId}
                              
                              <button key={"Accept"+i} onClick={this.acceptrequestHospital} name= {i} className="LabText_Button" >Accept</button>
                              <button key={"Reject"+i} onClick={this.rejectrequestHospital} name= {i}  className="LabText_Button">Reject</button>
                            
                              </h2>
                              <br/>

                </div>
    
          )

        }
    }
    if(hospitalrequests.length === 0){
        return(<h2 className="FormField">No Requests from Hospital</h2>)
    }
    return hospitalrequests
    }
    return 
  }
  
  
  doctorRequests() {
    if (this.state.populateCheck) {
       
      var doctorrequests=[]
      
    for(var i=0 ; i<this.state.array.length ;i+=1){
        if(this.state.array[i].category === "Patient" && this.state.array[i].doctorId === this.props.id.id ){

            doctorrequests.push(

                <div className="LabText" key={i}>
                        <h2>Patient ID: {this.state.array[i].patientId}
                              
                              <button key={"Accept"+i} onClick={this.acceptviewDoctor} name= {i} className="LabText_Button" >View</button>
                              <button key={"Reject"+i} onClick={this.rejectviewDoctor} name= {i}  className="LabText_Button">Reject</button>
                            
                              </h2>
                              <br/>

                </div>
           
          )

        }
        
    }
    if(doctorrequests.length === 0){
        return(<h2 className="FormField">No Requests from Doctor</h2>)

    }
    return doctorrequests
    }
    return 
  }


  render() {
    if(this.state.redirect){
        return (<Redirect 
          to={{
              pathname: 'viewmed',
              mydat: {
                id:   this.props.id.id,
                patientId: this.state.patientId,
                HCId: this.props.id.HCId
              }
          }}
        
        />)
  
      }

    return (

        <div className="PatientInfoForm">
        <h1> Doctor Request Notifications </h1>
        <div className="PatientBoxBorder">

          <div id="bottom">
            <div className="inner">
                <h1 className="FormField">Patients Response</h1>
                {this.doctorRequests()}
           
            </div>
            <div className="inner">
            <h1 className="FormField">Hospital Requests</h1>
            {this.hospitalsRequests()}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default RequestStatusDoctor;
