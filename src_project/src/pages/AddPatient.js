import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {  Redirect } from 'react-router-dom';
import axios from 'axios'


class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: '',
      DLId:'',//hospital or clinic id
      patientIdError: "",      
      DLIdError:"",
      doctorRedirect:false,
      labRedirect:false,
      error:false,
      credentials: this.props.location.mydat,

    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gobackprevious =   this.gobackprevious.bind(this)
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  async componentDidMount() {
    if (this.state.credentials !== undefined) {
      this.setState({
        DLId: this.state.credentials.id,
      })
      
    }

  }

  async handleSubmit(e) {
    e.preventDefault();
    const isError = await this.validate()
    //validation Check 
    if (isError === false) {
      this.setState(this.state)
      //patient adding entity 
        if(this.state.credentials.category==="Doctor"){
          
         var Ddata= {
            "$class": "org.example.empty.updatePatientList",
            "Doctor": "resource:org.example.empty.Doctor#" + this.state.DLId,

            "newPatients": [
              "resource:org.example.empty.Patient#" + this.state.patientId
            ],
            "pid": this.state.patientId
          }

              
              await axios.post('http://localhost:3000/api/updatePatientList', Ddata)
        .then((response) => {
          
          if(response.data === "Added Successfuly" || response.data === "Updation Successful"){
            this.setState({
              patientId: '',
              DLId:'',//hospital or clinic id
              patientIdError: "",      
              DLIdError:""
            })
          }
        });
        }
        //patient added by laboratory
        else if(this.state.credentials.category==="Laboratory"){
          

          var Ldata= {
            "$class": "org.example.empty.updateLabPatientList",
            "Lab": "resource:org.example.empty.Lab#" + this.state.DLId,
            "newPatients": [
              "resource:org.example.empty.Patient#" + this.state.patientId
            ],
            "pid": this.state.patientId
          }

          

          await axios.post('http://localhost:3000/api/updateLabPatientList', Ldata)
        .then((response) => {
          if(response.data === "Added Successfuly" || response.data === "Updation Successful"){
            this.setState({
              patientId: '',
              DLId:'',//hospital or clinic id
              patientIdError: "",      
              DLIdError:""
            })
          }
        });

        }

    }
    else {
      console.log("error in validation")
    }

  }
  validate = async () => {
    let isError = false
    //doctor id empty error
    if (!this.state.patientId) {
      var patientIdError = " Doctor Id  must not be empty";
      this.setState({ patientIdError })
      isError = true;
    }
    //hospital/ clinic empty error
    if (!this.state.DLId) {
      var  DLIdError = "ID must not be empty";
      this.setState({ DLIdError })
      isError = true;
    }
   /* if(this.state.DLId=== this.state.idGiven){
        console.log("Id does not match")
        this.setState({DLId: this.state.DLId + " Id does not match"})
        isError=true
    }*/
    this.setState({error: isError})
    return isError;
  }

  addPatient(){
    if(this.state.error){
      return (<h3>Invalid Credentials Error. Could not Add Patient</h3>)
    }

  }
  gobackprevious(){
      if(this.state.credentials.category==="Doctor"){
          return this.setState({doctorRedirect:true})
      }
      return this.setState({labRedirect:true})
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
            <h1>Add Patient</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>
          
          </Nav>
        </Navbar>
      
        <div className="User_Form">


          <div className="FormTitle">
            <h1>Add Patient Here</h1>
          </div>

          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="patientId"></label>
                <input type="text" id="patientId" className="FormField__Input" placeholder="Enter Patient Id" name="patientId" value={this.state.patientId} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="hospital/clinic"></label>
                <input type="text" id="DLId" disabled className="FormField__Input" placeholder="Enter Doctor/Lab Id" name="DLId" value={this.state.DLId} onChange={this.handleChange} />
              </div>

            </form>
            <div className="FormField">
              <button className="FormField__Button mr-20" onClick={this.gobackprevious}>Back</button>
              <button type="submit" onClick={this.handleSubmit} className="FormField__Button mr-20">Add Patient</button>
              
              {this.addPatient()}
              
              
            </div>
            
          </div>

        </div>
        </div>
      
    );
  }
}

export default AddPatient;
