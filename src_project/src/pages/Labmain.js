import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
var id =10001
class Labmain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idGiven: this.props.location.mydat,
            signout: false,
            addPatient: false,
            changePass: false,
            selectedFile: null,
            labarray:'',
            populate:false

        }
        //console.log(this.state.idGiven)
        this.ChangeCheckStatus = this.ChangeCheckStatus.bind(this);
        this.onChange = this.onChange.bind(this)
        this.handleSubmit =  this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        if(this.state.idGiven !== undefined){
            await axios.get('http://localhost:3000/api/Lab/'+ this.state.idGiven)//add id later
            .then(res => {
              this.setState({labarray:res.data})
            })
            this.setState({populate:true})
            await axios.post('http://localhost:3000/api/getTestrepNumbers',{"$class": "org.example.empty.getTestrepNumbers"})
            .then(res => {
              
              if(Number.isInteger(res.data)){
                  id=id+ res.data
              }
            })
            

        }

      }

    ChangeCheckStatus(e) {
        if (e.target.name === "signout") {
            this.setState({ signout: true })
        }
        if (e.target.name === "addPatient") {
            this.setState({ addPatient: true })
        }
        if (e.target.name === "changePass") {
            this.setState({ changePass: true })
        }

    }
    onChange(e) {
        
        this.setState({selectedFile: e.target.files[0]})
    }
    async handleSubmit(e){
        var patientId= e.target.name

        e.preventDefault();
        if(this.state.selectedFile !== null){
            let reader = new FileReader();
            reader.readAsDataURL(this.state.selectedFile);
            reader.onload =async  (e) => {
                
                var data ={
                    "$class": "org.example.empty.TestReport",
                    "reportId": (id=id+1),
                    "patientId": patientId,
                    "labId": "L5000",
                    "reportbase64": e.target.result
                  }
                  
                await axios.post('http://localhost:3000/api/TestReport', data)
                .then(res => {
                  this.setState({populate:true})
                })
            }

        }

    }
    populate(initial) {
        if(this.state.populate){
            if("myPatients" in this.state.labarray){
                var patients = []
                for (var i = initial; i < this.state.labarray.myPatients.length; i+=2) {
                    patients.push(
                        <div className="LabText" key={i}>
                            <h2>Patient ID: {this.state.labarray.myPatients[i].split("#")[1]}
                                
                                <input style ={{display:'none'}} 
                                className="LabText_Button" 
                                name ={this.state.labarray.myPatients[i].split("#")[1]}  
                                onChange={this.onChange} type="file" 
                                ref={fileInput => this.fileInput = fileInput}
                                />
                                <button className="LabText_Button"  name ={this.state.labarray.myPatients[i].split("#")[1]} onClick={()=>this.fileInput.click()}>Pick File</button>
                                <button className="LabText_Button" name ={this.state.labarray.myPatients[i].split("#")[1]} onClick={this.handleSubmit}>Upload Reports</button>
                            </h2>
                            <br />
                        </div>
                    )
                }
                return patients
                
            }
            else {
                return (
                    <h2>No Registered Patients</h2>
                )
            }
        }
       

    }
    render() {
        if (this.state.signout) {
            return (
                <Redirect to={''} />
            )
        }
        if (this.state.changePass) {
            return (<Redirect
                to={{
                    pathname: 'changepassword',
                    mydat: {
                        id: this.state.idGiven,
                        category: "Laboratory"
                    }
                }}

            />)

        }
        if (this.state.addPatient) {
            return (<Redirect
                to={{
                    pathname: 'addpatient',
                    mydat: {
                        id: this.state.idGiven,
                        category: "Laboratory"
                    }
                }}

            />)

        }

          if(this.state.idGiven === undefined){
            return (
              <Redirect to={''}/>
            )
          }
        return (


            <div className="App__Aside">

                <Navbar bg="dark" variant="dark" className="mr-auto mynav">
                    <Navbar.Brand>
                        <h1>Laboratory Menu</h1>
                    </Navbar.Brand >
                    <Nav className="mr-auto mynav">
                    </Nav>
                    <Nav>
                        <Nav.Link name="addPatient" onClick={this.ChangeCheckStatus} >Add Patient</Nav.Link>

                        <Nav.Link name="changePass" onClick={this.ChangeCheckStatus}>Change Password</Nav.Link>
                        <Nav.Link name="signout" onClick={this.ChangeCheckStatus}> Sign Out</Nav.Link>
                    </Nav>
                </Navbar>



                <div className="PatientInfoForm">
                    <h1>Affiliated Patients</h1>
                    <div className="PatientBoxBorder">



                    <div id="content">
                    <div id="left">
                    {this.populate(0)}
                    </div>

                    <div id="right">
                    {this.populate(1)}
                    </div>
                </div>

                        

                    </div>
                </div>


            </div>
        );
    }

}

export default Labmain;