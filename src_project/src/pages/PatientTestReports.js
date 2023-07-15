import React, { Component } from 'react';
import axios from 'axios';


class TestReports extends Component {
constructor() {
    super();
    this.state = {
        array: "",
        populateCheck: false,//checks if the data from server has arrived yet or not

    };

}

async componentDidMount() {
    //API for medical test view of patient before page loading 
    await axios.get('http://localhost:3000/api/TestReport')
        .then(res => {
            var reports = []
            //setting up the data into array 

            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].patientId === this.props.pid) {//add here 
                    reports.push(res.data[i])

                }
            }
            this.setState({ array: reports })
        })
    //after populating the array now populating tags through populateCheck 
    this.setState({ populateCheck: true })
}



testreports(initial) {
    if (this.state.populateCheck) {
        var reportarray = []

        for (var i = initial; i < this.state.array.length; i += 2) {
            reportarray.push(
                <div key={i}>
                    <img className="imageClass" src={this.state.array[i].reportbase64} alt="Patient Medical Test" width="800" height="800"></img>
                </div>


            )
        }
        if(reportarray.length===0 && initial===0){
            return (<h1>No Reports Uploaded Yet</h1>)
        }
        else{
            return reportarray
        }
        
    }
}


render() {
    return (

        <div className="PatientInfoForm">
            <h1> Patient Reports </h1>
            <div className="PatientBoxBorder">

                <div id="content">
                    <div id="left">
                        {this.testreports(0)}
                    </div>

                    <div id="right">
                        {this.testreports(1)}
                    </div>
                </div>

            </div>
        </div>
    );
}
}

export default TestReports;
