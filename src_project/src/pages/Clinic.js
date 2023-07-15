import React, { Component } from 'react'
import AddDoctor from './AddDoctor'
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

class Clinic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idGiven: this.props.location.mydat,
      signout: false,
      addDoctor: false,
      changePass: false,
      clinicArray:null,
      populate:false
    }
    //console.log(this.state.idGiven)
    this.ChangeCheckStatus = this.ChangeCheckStatus.bind(this);
  }
  async componentDidMount() {
    if(this.state.idGiven !== undefined){
      if(this.state.idGiven !== undefined){
        await axios.get('http://localhost:3000/api/Clinic/' + this.state.idGiven)
        .then(res => {
          this.setState({clinicArray:res.data})
        })
        
        this.setState({populate:true})
  
      }
    }
    
  }


  ChangeCheckStatus(e) {
    if (e.target.name === "signout") {

      this.setState({ signout: true })

    }
    if (e.target.name === "addDoctor") {
      
      this.setState({ addDoctor: true })
    }
    if (e.target.name === "changePass") {
      this.setState({ changePass: true })
    }
  }
  populate(initial) {
    if(this.state.populate){
      if("myDoctors" in this.state.clinicArray){
        var doctors=[]
        for (var i = initial; i < this.state.clinicArray.myDoctors.length; i+=2) {
          doctors.push(
          <div className="LabText" key={i}>
          <h1> Doc ID: {this.state.clinicArray.myDoctors[i].split('#')[1]} </h1>
          </div>
          )

        }
        return doctors
      }
      else {

        return (<h2>No Registered Doctors</h2>)
      }
    }

  }
  DisplayFunction() {
    if (this.state.addDoctor) {
      var mydat={
        id:this.state.idGiven,
        category:"Clinic"
      }
      
      return <AddDoctor dataFromParent = {mydat}/>
    }
    return (
      <div className="PatientInfoForm">
        <h1>Affiliated Doctors</h1>
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
    )
  }
  render() {  
    if (this.state.signout) {
      return (
        <Redirect to={''} />
      )
    }
    if(this.state.idGiven === undefined){
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
            category: "Clinic"
          }
        }}

      />)

    }
    if (this.state.addDoctor) {
      return (<Redirect
        to={{
          pathname: 'adddoctor',
          mydat: {
            id: this.state.idGiven,
            category: "Clinic"
          }
        }}

      />)

    }

    /*  if(this.state.idGiven === undefined){
        return (
          <Redirect to={''}/>
        )
      }*/
    return (


      <div className="App__Aside">

        <Navbar bg="dark" variant="dark" className="mr-auto mynav">
          <Navbar.Brand>
            <h1>Clinic Menu</h1>
          </Navbar.Brand >
          <Nav className="mr-auto mynav">
          </Nav>
          <Nav>
            <Nav.Link name="addDoctor" onClick={this.ChangeCheckStatus} >Add Doctor</Nav.Link>
           
            <Nav.Link name="changePass" onClick={this.ChangeCheckStatus}>Change Password</Nav.Link>
            <Nav.Link name="signout" onClick={this.ChangeCheckStatus}> Sign Out</Nav.Link>
          </Nav>
        </Navbar>

        {this.DisplayFunction()}

      </div>

    );
  }

}

export default Clinic;