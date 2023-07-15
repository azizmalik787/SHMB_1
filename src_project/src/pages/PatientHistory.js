import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';


class History extends Component {
  constructor() {
    super();
    this.state = {
      array: "",
      populateCheck: false,//checks if the data from server has arrived yet or not

    };

  }

  async componentDidMount() {
    //API for medical record view of patient before page loading 
    await axios.get('http://localhost:3000/api/queries/viewpatientmedicalrec/?id=' + this.props.pid)
      .then(res => {
        //setting up the data into array 
        this.setState({ array: res.data })
      })
      //after populating the array now populating tags through populateCheck 
    this.setState({ populateCheck: true })
  }


  formdatavisualizer(labelData, placeholderData) {
    return (
      <Form.Group >
        <Form.Label>{labelData}</Form.Label>
        <Form.Control disabled={true} type="text" placeholder={placeholderData} />
      </Form.Group>
    )

  }

  formprescriptionvisualizer(labelData, placeholderData) {
    return (
      <Form.Group >
        <Form.Label>{labelData}</Form.Label>
        <Form.Control disabled={true} readOnly={true} as="textarea" rows="12" type="text" placeholder={placeholderData} />
      </Form.Group>
    )
  }

  
  checkEntity(index){
    /*check if hospital is coming or clinic id is coming from server */
    if("hospitalId" in this.state.array[index]){
      return (this.state.array[index].hospitalId)
    }
    return this.state.array[index].clinicId 

  }
  medicalreports(initial) {
    if (this.state.populateCheck) {
      var Reports=[]
      
    for(var i=initial ; i<this.state.array.length ;i+=2){
      Reports.push(


        <div id="bottom" key={i}>
          <div className="inner">
            {this.formdatavisualizer("Record Id", this.state.array[i].recordId)}
            {
              
            this.formdatavisualizer("Hospital/Clinic Id", this.checkEntity(i))}
          </div>

          <div className="inner">
            {this.formprescriptionvisualizer("Prescription", this.state.array[i].prescription)}
          </div>

          <div className="inner">
            {this.formdatavisualizer("Doctor Id", this.state.array[i].doctorId)}
            {this.formdatavisualizer("Last Consultation Date", this.state.array[i].LastConsultationDate)}
          </div>
        </div>


      )
    }
    if(Reports.length===0 && initial===0){
      return <h1>No History Available</h1>
    }
    return Reports
    }
  }


  render() {
    return (

      <div className="PatientInfoForm">
        <h1> Patient History </h1>
        <div className="PatientBoxBorder">

          <div id="bottom">
            <div className="inner">
            {this.medicalreports(0)}
              
            </div>
            <div className="inner">
            {this.medicalreports(1)}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default History;
