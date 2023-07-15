import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
var id = 60001
//to add new medical record of a patient
class AddMedicalRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patientId:'',
            HCId:'',
            doctorId:'',
            description:'',
            allergies:'',
            notes:'',
            prescription:'',
            doctorRedirect:false,
            credentials: this.props.location.mydat,
            currentDate : new Date().toLocaleString()

        };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gobackprevious =   this.gobackprevious.bind(this)

    }
    //post request to medical record number api before page load for setting up the users id 
  async componentDidMount() {
    if (this.state.credentials !== undefined) {
      this.setState({
        patientId: this.state.credentials.patientId,
        doctorId: this.state.credentials.id,
        HCId: this.state.credentials.hospId,
      })
      if (id === 60001) {
        var recordNumbers = { "$class": "org.example.empty.getMedicalrecNumbers" }
        await axios.post('http://localhost:3000/api/getMedicalrecNumbers', recordNumbers)
          .then(res => {
            id = id + res.data
          })
      }

    }

  }
       //to handle change in value
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
      }
      //function called at form submisson

  async  handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        id = id+1
        //variable for medical records
        var medicalRecord={
            "$class": "org.example.empty.MedicalRecord",
            "recordId": id ,
            "patientId": this.state.patientId,
            "doctorId": this.state.doctorId,
            "description": this.state.description,
            "notes": this.state.notes,
            "prescription": this.state.prescription,
            "Allergies": this.state.allergies,
            "LastConsultationDate": this.state.currentDate
          }
        if(this.state.HCId.includes("H")){
            medicalRecord.hospitalId=this.state.HCId
        }
        else{
            medicalRecord.clinicId=this.state.HCId
        }
        //post request to medical record api
        
    await axios.post('http://localhost:3000/api/MedicalRecord', medicalRecord)
      .then(res => {
        console.log(res.data)
        if(res.data.recordId === medicalRecord.recordId){
          this.setState({
            patientId:'',
            HCId:'',
            doctorId:'',
            description:'',
            allergies:'',
            notes:'',
            prescription:''

          })
        }
        
      })
        
    }
    gobackprevious(){
        this.setState({doctorRedirect:true})
    }
    //populate medical records in fields
    populateform(){
        return (
        <form >
             <div id="bottom">
            <div className="inner">
            <div className="FormField" >
            <input type="text" className="Form_background" placeholder="Enter Patient ID" name="patientId" value={this.state.patientId} onChange={this.handleChange}/>
          </div>

          <div className="FormField">
            <input type="text" className="Form_background" placeholder="Enter Hospital/Clinic Id" name="HCId" value={this.state.HCId} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <input type="tel" className="Form_background" placeholder="Enter Doctor Id" name="doctorId" value={this.state.doctorId} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <input type="text" className="Form_background" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <input type="text" className="Form_background" placeholder="Allergies" name="allergies" value={this.state.allergies} onChange={this.handleChange} />
          </div>
          <div className="FormField" >
            <input type="tel" className="Form_background" placeholder="Notes" name="notes" value={this.state.notes} onChange={this.handleChange} />
          </div>
          <div className="medicalFormButton">

          <button className="FormField__Button mr-20" onClick={this.gobackprevious}>Back</button>
          <button className="FormField__Button mr-20"type= "submit" onClick={this.handleSubmit} >Submit</button>

          </div>
          
              
            </div>
            <div className="inner">
                <div className="FormField">
                    <div className="Form_background">
                    <h2 >Prescription Box:</h2>
                    </div>
                    <textarea  className="prescriptionbox" name="prescription" rows="20" cols="70" value={this.state.precription} onChange={this.handleChange}></textarea>
                
                </div>
            </div>
          </div>
        </form>
        )
    }
    render() {
      if (this.state.credentials===undefined) {
        return (<Redirect
          to={{
            pathname: '',
            
          }}
  
        />)
  
      }
        if (this.state.doctorRedirect) {
            return (<Redirect
              to={{
                pathname: 'doctor',
                mydat: {
                  id: this.state.credentials.id,
                  HCId: this.state.credentials.hospId
                }
              }}
      
            />)
      
          }
        return (
            <div className="App__Aside">
    
        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Add Patient Record Menu</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>
          </Nav>
        </Navbar>
        <div className="PatientInfoForm">
        <h1>Add Patient Record </h1>
        <div className="PatientBoxBorder">
            {this.populateform()}
            
        </div>
      </div>        
      </div>
        );
    }
}
export default AddMedicalRecord;