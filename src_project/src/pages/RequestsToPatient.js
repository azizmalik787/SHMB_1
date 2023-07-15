import React, { Component } from 'react';
import {db} from './firebase'



class DoctorToPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
        populateCheck:false,
        array:'',
        requestIds:'',
      
    };
    this.acceptrequestDoctor = this.acceptrequestDoctor.bind(this)
    this.rejectrequestDoctor = this.rejectrequestDoctor.bind(this)
    this.acceptrequestOrganization = this.acceptrequestOrganization.bind(this)
    this.rejectrequestOrganization = this.rejectrequestOrganization.bind(this)
    this.fetchData = this.fetchData.bind(this)

    console.log(this.props.pid)

  }
  async fetchData(){
    await db.collection('DrPatient')
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
           
        }
    )
    .catch(error => console.log(error))


  }
  async componentDidMount() {
    await this.fetchData()
    this.setState({ populateCheck: true })
  }
  async acceptrequestDoctor(e){
      //delete from firebase 
      const requestId = this.state.requestIds[e.target.name]
      db.collection('DrPatient').doc(requestId).delete();
      //add to doctor notification 
      db.collection('PtDoctor').add({
          patientId: this.state.array[e.target.name].patientId,
          doctorId: this.state.array[e.target.name].doctorId,
          category:"Patient"
      })
      //fetch data 
      await this.fetchData()
      
      //populate true 
      this.setState({populateCheck:true })

  }
 async rejectrequestDoctor(e){
      //delete from firebase 
      const requestId = this.state.requestIds[e.target.name]
      db.collection('DrPatient').doc(requestId).delete();
      
      //fetch data 
      await this.fetchData()
      
      //populate true 
      this.setState({populateCheck:true })

  }
  async acceptrequestOrganization(e){
    //delete from firebase 
    const requestId = this.state.requestIds[e.target.name]
    db.collection('DrPatient').doc(requestId).delete();
    //add to doctor notification 
    db.collection('PtOrganization').add({
        patientId: this.state.array[e.target.name].patientId,
        organizationId: this.state.array[e.target.name].organizationId,
    })
    //fetch data 
    await this.fetchData()
    
    //populate true 
    this.setState({populateCheck:true })
    


  }
  async rejectrequestOrganization(e){
    //delete from firebase 
    const requestId = this.state.requestIds[e.target.name]
    await db.collection('DrPatient').doc(requestId).delete();
    
    //fetch data 
    await this.fetchData()
    
    //populate true 
    this.setState({populateCheck:true })


  }
  organizationsRequests() {
      
    if (this.state.populateCheck) {
      var organizationrequests=[]

    for(var i=0 ; i<this.state.array.length ;i+=1){
        //index number is being sent in the name of button to retrieve data from the array in state 
        if(this.state.array[i].category === "Hospital" && this.state.array[i].patientId === this.props.pid){
            organizationrequests.push(
            
                <div className="LabText" key={i}>
                        <h2>Organization ID: {this.state.array[i].organizationId}
                              
                              <button key={"Accept"+i} onClick={this.acceptrequestOrganization} name= {i} className="LabText_Button" >Accept</button>
                              <button key={"Reject"+i} onClick={this.rejectrequestOrganization} name= {i}  className="LabText_Button">Reject</button>
                            
                              </h2>
                              <br/>

                </div>
    
          )

        }
    }
    if(organizationrequests.length === 0){
        return(<h2 className="FormField">No Requests from Organization</h2>)
    }
    return organizationrequests
    }
    return 
  }
  
  
  doctorRequests() {
    if (this.state.populateCheck) {
       
      var doctorrequests=[]
      
    for(var i=0 ; i<this.state.array.length ;i+=1){
        if(this.state.array[i].category === "Doctor" && this.state.array[i].patientId === this.props.pid ){

            doctorrequests.push(

                <div className="LabText" key={i}>
                        <h2>Doctor ID: {this.state.array[i].doctorId}
                              
                              <button key={"Accept"+i} onClick={this.acceptrequestDoctor} name= {i} className="LabText_Button" >Accept</button>
                              <button key={"Reject"+i} onClick={this.rejectrequestDoctor} name= {i}  className="LabText_Button">Reject</button>
                            
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
    return (

        <div className="PatientInfoForm">
        <h1> Doctor Requests </h1>
        <div className="PatientBoxBorder">

          <div id="bottom">
            <div className="inner">
                <h1 className="FormField">Doctor Requests</h1>
                {this.doctorRequests()}
           
            </div>
            <div className="inner">
            <h1 className="FormField">Organization Requests</h1>
            {this.organizationsRequests()}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default DoctorToPatient;
