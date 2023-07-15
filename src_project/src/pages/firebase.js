
import * as firebase from 'firebase/firebase';
import 'firebase/firestore';



var firebaseConfig = {
  apiKey: "AIzaSyDNy5wNs5pz6X872eTXuPpgUL3dzdefJUg",
  authDomain: "my-app-ab726.firebaseapp.com",
  databaseURL: "https://my-app-ab726.firebaseio.com",
  projectId: "my-app-ab726",
  storageBucket: "my-app-ab726.appspot.com",
  messagingSenderId: "756250455278",
  appId: "1:756250455278:web:c67179490faef2e98d57ff"
};



  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth()
  export const db = firebase.firestore()
  export default firebase
