 // components/athleteList.js

 import React, { Component } from 'react';
 import axios from 'axios';
 import { Link } from 'react-router-dom';
 
 import createNewAthlete from './createNewAthlete';
 
 class athletetList extends Component {
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
         <div style>
           { this.state.listOfAthletes.map((athlete, index) => {
             return (
               <div key={athlete._id}>
                 <Link to={`/backend/./routes/api/CRUDRoutes/athleteProfileCrud.js/${athlete._id}`}>
                 <h3>{athlete.img}</h3>
                   <h3>{athlete.name}</h3>
                   <h3>Status:{risk} </h3>
                 </Link>
                 <p style={{maxWidth: '400px'}} >{athlete.description} </p>
               </div>
             )})
           }
         </div>
         <div>
             <AddProject getData={() => this.getAllAthletes()}/>
         </div>
       </div>
     )
   }
 }
 
 export default ProjectList;