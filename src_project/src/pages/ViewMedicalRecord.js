import React, { Component } from 'react'
import { Navbar, Nav, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'


class ViewMedicalRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: '',
            doctorRedirect: false,
            organizationRedirect:false,
            credentials: this.props.location.mydat,
            populate: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.gobackprevious = this.gobackprevious.bind(this)


        console.log(this.state.credentials)
    }
    async componentDidMount() {
        await axios.get('http://localhost:3000/api/queries/viewpatientmedicalrec/?id=' + this.state.credentials.patientId)
            .then(res => {
                this.setState({ array: res.data })
            })
        this.setState({ populate: true })

    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    gobackprevious() {
        if("organizationId" in this.state.credentials){
            return this.setState({organizationRedirect:true})

        }
        else{
            return this.setState({ doctorRedirect: true }) 
        }
        
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
                <Form.Control disabled={true} readOnly={true} as="textarea" rows="13" type="text" placeholder={placeholderData} />
            </Form.Group>
        )
    }

    checkEntity(index) {
        /*check if hospital is coming or clinic id is coming from server */
        if ("hospitalId" in this.state.array[index]) {
            return (this.state.array[index].hospitalId)
        }
        return this.state.array[index].clinicId

    }


    medicalreports(initial) {
        if(this.state.array.length === 0){
            return 
        }
        var Reports = []


        for (var i = initial; i < this.state.array.length; i += 2) {
            Reports.push(
                <div key={i} id="content">
                    <div id="left">
                        {this.formdatavisualizer("Record Id", this.state.array[i].recordId)}
                        {this.formdatavisualizer("Patient Id", this.state.array[i].patientId)}
                        {this.formdatavisualizer("Hospital/Clinic Id", this.checkEntity(i))}
                        {this.formdatavisualizer("Doctor Id", this.state.array[i].doctorId)}
                        {this.formdatavisualizer("Description Id", this.state.array[i].description)}
                        {this.formdatavisualizer("Notes", this.state.array[i].notes)}
                    </div>

                    <div id="right">

                        {this.formdatavisualizer("Allergies", this.state.array[i].Allergies)}
                        {this.formdatavisualizer("Last Consultation Date", this.state.array[i].LastConsultationDate)}
                        {this.formprescriptionvisualizer("Prescription", this.state.array[i].prescription)}

                    </div>
                </div>

            )
        }
        return Reports
    }


    populate() {
        if (this.state.populate) {
            return (
                <div id="content">
                    <div id="left">
                        {this.medicalreports(0)}
                    </div>

                    <div id="right">
                        {this.medicalreports(1)}
                    </div>
                </div>
            )
        }
    }



    render() {
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
        if (this.state.organizationRedirect) {
            return (<Redirect
                to={{
                    pathname: 'researchorg',
                    mydat: this.state.credentials.organizationId
                    
                }}

            />)

        }
        return (
            <div className="App__Aside">

                <Navbar bg="dark" variant="dark" className="mr-auto mynav">
                    <Navbar.Brand>
                        <h1>View Patient Record Menu</h1>
                    </Navbar.Brand >
                    <Nav className="mr-auto mynav">
                    <Nav.Link onClick={this.gobackprevious}>GO BACK</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link >Contact Us</Nav.Link>
                        <Nav.Link >About</Nav.Link>
                    </Nav>
                </Navbar>


                <div className="PatientInfoForm">
                    <h1>Patient Medical History </h1>
                    <div className="PatientBoxBorder">
                        {this.populate()}

                    </div>
                </div>
            </div>
        );
    }
}
export default ViewMedicalRecord;