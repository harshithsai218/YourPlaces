import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import PlaceItem from "../Components/PlaceItem";
import Button from "../../Shared/Components/FormElements/Button";

import "./PlacesList.css"
const PlaceList = props =>{
    if(props.items.length ===0 ){
       return <div className="place-list center">
        <Card>
        <h2> No Places Were Found. MayBe Create One</h2>
        <Button to="/places/new">Share Place</Button>
       </Card>
       </div>
       
    }
    return <ul className="place-list">
        {props.items.map(place => 
        <PlaceItem 
            key={place.id} 
            id={place.id} 
            image={place.image} 
            title={place.title} 
            description={place.description} 
            address={place.address} 
            creatorId={place.creator} 
            coordinates={place.location}
            onDelete={props.onDeletePlace}
         />)}
    </ul>
};

export default PlaceList;