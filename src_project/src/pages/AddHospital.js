import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {  Redirect } from 'react-router-dom';
import axios from 'axios'


class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      hospitalId:'',//hospital 
      orgId: '',//research organization
      orgIdError: "",      
      hospitalIdError:"",
      orgRedirect:false,
      error:false,
      credentials: this.props.location.mydat,

    };
    console.log(this.state.credentials)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gobackprevious =   this.gobackprevious.bind(this)
  }
  async componentDidMount() {
    if (this.state.credentials !== undefined) {
      this.setState({
        orgId: this.state.credentials.id,
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
      this.setState(this.state)

          var Hdata={
            "$class": "org.example.empty.updateOrgHospitalList",
            "org": "resource:org.example.empty.Researchorganization#" + this.state.orgId,
            "newHospitals": [
              "resource:org.example.empty.Hospital#"+ this.state.hospitalId
            ],
            "hid": this.state.hospitalId
          }
            await axios.post('http://localhost:3000/api/updateOrgHospitalList', Hdata)
        .then((response) => {
          console.log(response.data);
          if(response.data === "Added Successfuly" || response.data === "Updation Successful"){
            this.setState({
              hospitalId: '',
              orgId: '',
              orgIdError: "",
              hospitalIdError: ""
            })
          }
        });

    }
    else {
      console.log("error in validation")
      
    }

  }
  validate = async () => {
    let isError = false
    //doctor id empty error
    if (!this.state.orgId) {
      var orgIdError = " lab Id  must not be empty";
      this.setState({ orgIdError })
      isError = true;
    }
    //hospital/ clinic empty error
    if (!this.state.hospitalId) {
      var  hospitalIdError = "ID must not be empty";
      this.setState({ hospitalIdError })
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

  addHospital(){
    if(this.state.error){
      return (<h3>Invalid Credentials Error. Could not Add Doctor</h3>)
    }

  }
  gobackprevious(){
      return this.setState({orgRedirect:true})
  }
  render() {
    if (this.state.credentials===undefined) {
      return (<Redirect
        to={{
          pathname: '',
          
        }}

      />)

    }
      if (this.state.orgRedirect) {
        return (<Redirect
          to={{
            pathname: 'researchorg',
            mydat: this.state.credentials.id
          }}
  
        />)
  
      }

    return (
        <div className="App__Aside">
        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Add Hospital</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>
           
          </Nav>
        </Navbar>
      
        <div className="User_Form">

          <div className="FormTitle">
            <h1>Add Hospital Here</h1>
          </div>

          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="hospitalId"></label>
                <input type="text" id="hospitalId" className="FormField__Input" placeholder="Enter Hospital Id" name="hospitalId" value={this.state.hospitalId} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="researchorg"></label>
                <input type="text" id="researchorg" disabled className="FormField__Input" placeholder="Enter Research Organization Id" name="orgId" value={this.state.orgId} onChange={this.handleChange} />
              </div>

            </form>
            <div className="FormField">
              <button className="FormField__Button mr-20" onClick={this.gobackprevious}>Back</button>
              <button type="submit" onClick={this.handleSubmit} className="FormField__Button mr-20">Add Hospital</button>
              
              {this.addHospital()}
              
              
            </div>
            
          </div>

        </div>
        </div>
      
    );
  }
}

export default AddPatient;
