import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {  Redirect } from 'react-router-dom';
import axios from 'axios'


class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labId: '',
      hospitalId:'',//hospital 
      labIdError: "",      
      hospitalIdError:"",
      hospitalRedirect:false,
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
        hospitalId: this.state.credentials.id,
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
      console.log('The form was submitted with the following data:');
      this.setState(this.state)

          console.log(this.state)
          var Ldata={
            "$class": "org.example.empty.updateLabList",
            "Hospital": "resource:org.example.empty.Hospital#" +  this.state.hospitalId,
            "newLabs": [
              "resource:org.example.empty.Lab#"+ this.state.labId
            ],
            "lid": this.state.labId
          }

           console.log(Ldata)
          await axios.post('http://localhost:3000/api/updateLabList', Ldata)
        .then((response) => {
          if(response.data === "Added Successfuly" || response.data === "Updation Successful"){
            this.setState({
              labId: '',
              hospitalId:'',
              labIdError: "",      
              hospitalIdError:"",

            })
          }
        });

    }
    else {
      console.log("error in validation")
      console.log(this.state)
    }

  }
  validate = async () => {
    let isError = false
    //doctor id empty error
    if (!this.state.labId) {
      var labIdError = " lab Id  must not be empty";
      this.setState({ labIdError })
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

  addLab(){
    if(this.state.error){
      return (<h3>Invalid Credentials Error. Could not Add Doctor</h3>)
    }

  }
  gobackprevious(){
      return this.setState({hospitalRedirect:true})
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

    return (
        <div className="App__Aside">
        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Add Labaratory</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>
         
          </Nav>
        </Navbar>
      
        <div className="User_Form">

          <div className="FormTitle">
            <h1>Add Laboratory Here</h1>
          </div>

          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="patientId"></label>
                <input type="text" id="labId" className="FormField__Input" placeholder="Enter Laboratory Id" name="labId" value={this.state.labId} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="hospital"></label>
                <input type="text" id="hospitalId" disabled className="FormField__Input" placeholder="Enter Hospital Id" name="hospitalId" value={this.state.hospitalId} onChange={this.handleChange} />
              </div>

            </form>
            <div className="FormField">
              <button className="FormField__Button mr-20" onClick={this.gobackprevious}>Back</button>
              <button type="submit" onClick={this.handleSubmit} className="FormField__Button mr-20">Add Laboratory</button>
              
              {this.addLab()}
              
              
            </div>
            
          </div>

        </div>
        </div>
      
    );
  }
}

export default AddPatient;
