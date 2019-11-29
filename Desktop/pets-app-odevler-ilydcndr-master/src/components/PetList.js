import React from 'react';
import {Pet} from "../components";
import {getPets} from "../constants";
import {stringContains} from "../helpers";
import debounce from "lodash.debounce";


class PetList extends React.Component{
    breed;
    constructor(props){
        super(props);
        this.state = {
            _pets: [],
            pets: [],
            yukleniyor: true,
            gosterilecek:[]
           
        }

        window.onscroll = debounce(() => {
            const {AfterFirstLoadPet}= this;

            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
              ) {
                AfterFirstLoadPet();
              }
            }, 1000);
    } 


      FirstloadPet=()=>{
          const gosterilecek=this.state.gosterilecek
              this.setState({
                        gosterilecek:gosterilecek.concat(this.state.pets.slice(0,4))
              },()=>{
                  console.log(gosterilecek)
              })       
          }
     

     AfterFirstLoadPet=()=>{
            this.setState({
                gosterilecek:(this.state.pets.slice(0,4))
            })
         }

    componentWillMount() {
            this.AfterFirstLoadPet();
        }
       
      

    componentDidMount() {
        getPets().then((data) => {
            this.setState({
                _pets: data,
                pets: data,
                yukleniyor: false,
            },()=>{
                this.FirstloadPet();
            })
        })
    }



    componentDidUpdate(prevProps) {
        if(prevProps.activeFilter !== this.props.activeFilter){
            this.filterPets();
        }
        if(prevProps.searchValue !== this.props.searchValue){
            this.filterPets();
        }
    }

    filterPets = () => {
        if(!this.props.activeFilter){
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return stringContains(pet.name, this.props.searchValue)
                })
            })
        }else{
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return pet.breed === this.props.activeFilter;
                }).filter((filteredPet) => {
                    return stringContains(filteredPet.name, this.props.searchValue)
                })
            })
        }
    }


    render(){
        const Yukleniyor = <div>Yukleniyor</div>;
        const EmptyPets = <div>Bulunamadı</div>;
        const Pets =  [<h3>Gösterilen Pet Sayısı: {this.state.pets.length}</h3>,
        
             <div className="row h-100">
            {
                this.state.gosterilecek.map((pet) => {
                    return <Pet style={{height:"1000px"}} key={Math.random()} {...pet} />
                })
                
            }
            </div>]
           
          if(this.state.yukleniyor){
            return Yukleniyor;
          }else if(this.state.pets.length === 0){
            return EmptyPets
        }else{
            return Pets;
        }
    }
}



export default PetList;
