import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Selection from './pages/Selection';
import DoctorLogin from './pages/DoctorLogin';
import HospitalLogin from './pages/HospitalLogin';
import LabLogin from './pages/LabLogin';
import ClinicLogin from './pages/ClinicLogin';
import PatientLogin from './pages/PatientLogin';
import Labmain from './pages/Labmain';
import Hospital from './pages/Hospital';
import Clinic from './pages/Clinic';
import Doctormain from './pages/Doctormain';
import HospitalLab from './pages/HospitalLab';
import Patient from './pages/Patient';
import PatientPersonalInfo from './pages/PatientPersonalInfo';
import AddDoctor from './pages/AddDoctor';
import AddLaboratory from './pages/AddLab';
import AddPatient from './pages/AddPatient';
import AddHospital from './pages/AddHospital';
import AddMedicalRecord from './pages/AddMedicalRecord';
import ViewMedicalRecord from './pages/ViewMedicalRecord';

import ChangePassword from './pages/ChangePassword';
import ResearchOrganizationLogin from './pages/ResearchOrganizationLogin';
import ResearchOrg from './pages/ResearchOrg';
import DoctorSignUpForm from './pages/DoctorSignUpForm';
import HospitalSignUpForm from './pages/HospitalSignUpForm';
import ClinicSignUpForm from './pages/ClinicSignUpForm';
import LabSignUpForm from './pages/LabSignUpForm';
import ResOrgSignUpForm from './pages/ResOrgSignUpForm';
import PatientSignUpForm from './pages/PatientSignUpForm';
import signup from './pages/signup';



import './App.css';

class App extends Component {
  render() {
    return (
      <Router basename="">
        <div className="App">
          
                <Route exact path="/" component={Selection}>
                </Route>
                <Route exact path="/doctorlogin" component={DoctorLogin}>
                </Route>
                <Route exact path="/cliniclogin" component={ClinicLogin}>
                </Route>
                <Route exact path="/hospitallogin" component={HospitalLogin}>
                </Route>
                <Route exact path="/lablogin" component={LabLogin}>
                </Route>
                <Route exact path="/patientlogin" component={PatientLogin}>
                </Route>

                
                <Route exact path="/labmain" component={Labmain}>
                </Route>
                <Route exact path="/hospital" component={Hospital}>
                </Route>
                <Route exact path="/clinic" component={Clinic}>
                </Route>
                <Route exact path="/doctor" component={Doctormain}>
                </Route>
                <Route exact path="/hospitallabs" component={HospitalLab}>
                </Route>
                <Route exact path="/patient" component={Patient}>
                </Route>
                <Route exact path="/patientpersonalinfo" component={PatientPersonalInfo}>
                </Route>
                <Route exact path="/changepassword" component={ChangePassword}>
                </Route>
                <Route exact path="/orglogin" component={ResearchOrganizationLogin}>
                </Route>
                <Route exact path="/adddoctor" component={AddDoctor}>
                </Route>
                <Route exact path="/addpatient" component={AddPatient}>
                </Route>
                <Route exact path="/addmedicalrecord" component={AddMedicalRecord}>
                </Route>
                <Route exact path="/viewmed" component={ViewMedicalRecord}>
                </Route>
                <Route exact path="/addlaboratory" component={AddLaboratory}>
                </Route>
                <Route exact path="/addhospital" component={AddHospital}>
                </Route>
                <Route exact path="/researchorg" component={ResearchOrg}>
                </Route>
                <Route exact path="/doctorsignupform" component={DoctorSignUpForm}>
                </Route>
                <Route exact path="/hospitalsignupform" component={HospitalSignUpForm}>
                </Route>
                <Route exact path="/clinicsignupform" component={ClinicSignUpForm}>
                </Route>
                <Route exact path="/resorgsignupform" component={ResOrgSignUpForm}>
                </Route>
                <Route exact path="/patientsignupform" component={PatientSignUpForm}>
                </Route>
                <Route exact path="/labsignupform" component={LabSignUpForm}>
                </Route>
                <Route exact path="/signup" component={signup}>
                </Route>

        </div>
      </Router>
    );
  }
}

export default App;
