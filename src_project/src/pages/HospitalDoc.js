import React, { Component } from 'react';
import axios from 'axios'


class HospitalDoctors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hospitalarray:undefined,
      populate:false
      

    }
    
  }
  async componentDidMount() {
      await axios.get('http://localhost:3000/api/Hospital/'+ this.props.hospid)
      .then(res => {
        this.setState({hospitalarray:res.data})
      })
      this.setState({populate:true})    

  }
  populate(initial){
    if(this.state.populate){
      if("myDoctors" in this.state.hospitalarray){
        var labs=[]
        for(var i=initial ; i<this.state.hospitalarray.myDoctors.length ;i+=2){
          labs.push(
            <div className="LabText" key={i}>
            <h1> Doctor ID: {this.state.hospitalarray.myDoctors[i].split("#")[1]}
            </h1>
          </div>
          )
        }
        return labs


      }
      else {
        if(initial===1){
          return
        }//for printing no lab registered only once 
        return (
          <h2>No Registered Doctors</h2>
        )
      }
    }
    
  }

  render() {
    return (


      <div className="PatientInfoForm">
        <h1> Affiliated Doctors </h1>
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

    );
  }
}

export default HospitalDoctors;
