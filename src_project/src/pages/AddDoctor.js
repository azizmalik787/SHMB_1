import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {  Redirect } from 'react-router-dom';
import axios from 'axios'


class AddDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {

      
      doctorId:'',//doctor 
      HCId: '',

      doctorIdError: '',      
      HCIdError:'',
      
      
      hospitalRedirect:false,
      clinicRedirect:false,
      error:false,
      credentials: this.props.location.mydat,

    };
    //console.log(this.state.credentials)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gobackprevious =   this.gobackprevious.bind(this)
  }


  async componentDidMount() {
    if (this.state.credentials !== undefined) {
      this.setState({
        HCId: this.state.credentials.id,
      })
      
    }

  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const isError = await this.validate()
    
    if (isError === false) {
        if(this.state.credentials.category==="Hospital"){
            var hospitaldata={
                "$class": "org.example.empty.updateDocList",
                "Hospital": "resource:org.example.empty.Hospital#" + this.state.HCId,
                "newDoctors": [
                  "resource:org.example.empty.Doctor#" + this.state.doctorId
                ],
                "docid": this.state.doctorId
              }
            
                await axios.post('http://localhost:3000/api/updateDocList', hospitaldata)
            .then((response) => {
              console.log(response.data);
              if(response.data === "Added Successfuly" || response.data === "Updation Successful"){
                this.setState({
                  doctorId:'',
                  HCId: '',
                  doctorIdError: '',      
                  HCIdError:''
                })
              }
            });


        }
        else if(this.state.credentials.category==="Clinic") {
            var clinicdata={
                "$class": "org.example.empty.updateClinicDocList",
                "Clinic": "resource:org.example.empty.Clinic#"+this.state.HCId,
                "newDoctors": [
                  "resource:org.example.empty.Doctor#"+this.state.doctorId
                ],
                "docid": this.state.doctorId
              }
            
          
                await axios.post('http://localhost:3000/api/updateClinicDocList', clinicdata)
            .then((response) => {
              console.log(response.data);
              if(response.data === "Added Successfuly" || response.data === "Updation Successful"){
                this.setState({
                  doctorId:'',
                  HCId: '',
                  doctorIdError: '',      
                  HCIdError:''
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
    if (!this.state.doctorId) {
      var doctorIdError = " lab Id  must not be empty";
      this.setState({ doctorIdError })
      isError = true;
    }
    //hospital/ clinic empty error
    if (!this.state.HCId) {
      var  HCIdError = "ID must not be empty";
      this.setState({ HCIdError })
      isError = true;
    }
   
    this.setState({error: isError})
    return isError;
  }

  addDoctor(){
    if(this.state.error){
      return (<h3>Invalid Credentials Error. Could not Add Doctor</h3>)
    }

  }
  gobackprevious(){
      if(this.state.credentials.category==="Hospital"){
        this.setState({hospitalRedirect:true})
      }
      else {

        this.setState({clinicRedirect:true})
      }

  }
  render() {
    if (this.state.credentials===undefined) {
      return (<Redirect
        to={{
          pathname: '',
          
        }}

      />)

    }
      if (this.state.hospitalRedirect) {
        return (<Redirect
          to={{
            pathname: 'hospital',
            mydat: this.state.credentials.id
          }}
  
        />)
  
      }
      if (this.state.clinicRedirect) {
        return (<Redirect
          to={{
            pathname: 'clinic',
            mydat: this.state.credentials.id
          }}
  
        />)
  
      }

    return (
        <div className="App__Aside">
        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Add Doctor</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>
           
          </Nav>
        </Navbar>
      
        <div className="User_Form">

          <div className="FormTitle">
            <h1>Add Doctor Here</h1>
          </div>

          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="hospitalId"></label>
                <input type="text" id="doctorId" className="FormField__Input" placeholder="Enter Doctor Id" name="doctorId" value={this.state.doctorId} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="researchorg"></label>
                <input type="text" disabled id="HCId" className="FormField__Input" placeholder="Enter Hospital/Clinic Id" name="HCId" value={this.state.HCId} onChange={this.handleChange} />
              </div>

            </form>
            <div className="FormField">
              <button className="FormField__Button mr-20" onClick={this.gobackprevious}>Back</button>
              <button type="submit" onClick={this.handleSubmit} className="FormField__Button mr-20">Add Doctor</button>
              
              {this.addDoctor()}
              
              
            </div>
            
          </div>

        </div>
        </div>
      
    );
  }
}

export default AddDoctor;
