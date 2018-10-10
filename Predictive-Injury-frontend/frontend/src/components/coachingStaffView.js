 // components/AthleteList.js

 import React, { Component } from 'react';
 import axios from 'axios';
 import { Link } from 'react-router-dom';
 
//  import createNewAthlete from './AddProject';
 
 class AthleteList extends Component {
   constructor(){
       super();
       this.state = { listOfAthletes: [] };
   }
 
   getAllAthletes = () =>{
     axios.get(`http://localhost:5000/api/athletes`)
     .then(responseFromApi => {
       this.setState({
         listOfAthletes: responseFromApi.data
       })
     })
     .catch((err)=>{
         console.log(err);
     })
   }
 
   componentDidMount() {
     this.getAllAthletes();
   }
 
   render(){
     return(
       <div>
         <div style={{width: '60%', float:"left"}}>
           { this.state.listOfAthletes.map((athlete, index) => {
             return (
               <div key={athlete._id}>
                 <Link to={`/athletes/${athlete._id}`}>
                   <h3>{athlete.title}</h3>
                 </Link>
                 <p style={{maxWidth: '400px'}} >{athlete.description} </p>
               </div>
             )})
           }
         </div>
         <div style={{width: '40%', float:"right"}}>
             <AddProject getData={() => this.getAllAthletes()}/>
         </div>
       </div>
     )
   }
 }
 
 export default AthleteList;