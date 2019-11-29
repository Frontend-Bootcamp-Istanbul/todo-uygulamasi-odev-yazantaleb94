import React from 'react';

class PetDetay extends React.Component{
    constructor(props){
        super(props)
        this.state={
            petbilgi:[],

        }
    }

    componentDidMount() {
      
        fetch(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${this.props.match.params.id}`)
        .then((resp)=>resp.json())
          .then((data) => {      
            this.setState({ 
                petbilgi:data });
          });
      }

    render(){
    return(
        <div class="container mt-5 h-100">
        <div class="card col-12 col-md-12 col-sm-12 h-100" >
        {console.log(this.state.petbilgi)}
        <img class="card-img-top w-50 mt-5" style={{marginLeft:"250px",height:"300px"}} src={this.state.petbilgi.image}></img>
        <div class="card-body">
         <h5 class="card-title" style={{color:"green",fontWeight:"bolder"}}>{this.state.petbilgi.name}</h5>
         <p class="card-subtitle mb-2 text-muted ">{this.state.petbilgi.breed}</p>
       <span class="card-subtitle mb-2 badge badge-pill badge-success"><span class="badge badge-warning">AGE=</span>{this.state.petbilgi.age}</span>
       <p class="card-text">{this.state.petbilgi.description}</p>
       <button class="btn btn-success"> Favorilere ekle</button>
       
        </div>
        </div>
        </div>
        
        
        
        
        

    )
    
    }
    
}


   

export default PetDetay;