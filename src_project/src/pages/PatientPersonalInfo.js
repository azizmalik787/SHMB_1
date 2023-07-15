import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';





class Personal extends Component {
  //initial state of the class personal info of patient 
  constructor(props) {
    super(props);
    console.log(this.props.pid)
    this.state = {
      array:{"$class": "",
      "patientId": "",
      "patientName": "",

      "gender": "",
      "password": "",
      "age": "",
      "cnic": "",
      "address": "",
      "status": "",
      "phoneNo": ""
    }
    }


}

//component giving data being fetched from back end 
async DataFetcher(){
  //API call 
  var url = "http://localhost:3000/api/Patient/"+this.props.pid

  const response = await fetch(url);  
  return await response.json();
}


  async componentDidMount() {
    //getting data from API for showing personal information of patient 
    const res = await this.DataFetcher();
    this.setState({array:res});
    this.functionpopulate();
  }


  


  //this function is using react bootstrap form to display info with given parameter and it's value 
  tryfunction(parameter, parameterValue) {
    return (
      <Form.Group >
        <Form.Label>{parameter}</Form.Label>
        <Form.Control disabled="true " type="text" placeholder={parameterValue} />
      </Form.Group>
    );
  }

  

  //populate function is making function calls with parameter and it's value to above function 
  functionpopulate(){
    return (
      
      <div className="PatientBoxBorder">
        <div id="bottom">
          <div className="inner">
            <h1 id="GeneralCenter" > General Info</h1>
              
              {this.tryfunction("Patient Id",this.state.array.patientId)}
              {this.tryfunction("Patient Name",this.state.array.patientName)}
              {this.tryfunction("Patient Gender",this.state.array.gender)}
              {this.tryfunction("Patient Age",this.state.array.age)}
              {this.tryfunction("Patient CNIC",this.state.array.cnic)}
              {this.tryfunction("Patient Status",this.state.array.status)}
              
          </div>
          <div className="inner">
          <h1 id="ContactCenter">Contact Info</h1>
            {this.tryfunction("Patient Phone Number",this.state.array.phoneNo)}
            <h1 id="AddressCenter">Address Info</h1>
            
            {this.tryfunction("Patient Permanent Address",this.state.array.address)}
            
            {this.tryfunction("Patient Current Address",this.state.array.address)} 

          </div>
        </div>
      </div>
    );
  }

  render() {
    

    return (

        <div className="PatientInfoForm">
          <h1> Patient Personal Info </h1>
        
        {this.functionpopulate()}
        </div>
    );
  }
}

export default Personal;
