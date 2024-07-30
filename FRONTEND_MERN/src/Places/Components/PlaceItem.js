import React,{useState,useContext} from "react";
import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal";
import Map from "../../Shared/Components/UIElements/Map";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { AuthContext } from "../../Shared/Context/Auth-context";
import { useHttpClients } from "../../Shared/hooks/http-hook";
import "./PlaceItem.css";

const PlaceItem = props =>{
    const { isLoading, error, sendRequest, clearError } = useHttpClients();
    const auth = useContext(AuthContext);
    
    const [showMap,setshowMap] =useState(false);
    const [showConfirmModal,setShowConfirmModal]=useState(false);
    
    const openMapHandler=() =>setshowMap(true);
    const closeMapHandler=() =>setshowMap(false);

    const showDeleteWarningHandler =()=>{
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = ()=>{
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () =>{
        setShowConfirmModal(false);
        try{ 
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                'DELETE'
            );
            props.onDelete(props.id);
        }
        catch(err){}
    };  
    
    return (
    <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
        <Modal 
        show={showMap} 
        onCancel={closeMapHandler} 
        header={props.address} 
        contentClass="place-item__modal-content" 
        footerClass="place-item__modal_actions" 
        footer={<Button onClick={closeMapHandler}>CLOSE MAP</Button>} 
        >
            <div className="map-container">
                <Map center = {props.coordinates} zoom={16}/>
            </div>
        </Modal>
        <Modal 
        show={showConfirmModal} 
        onCancel={cancelDeleteHandler} 
        header="Are you sure ?" 
        footerClass="place-item__model-actions" footer={
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
            </React.Fragment>
        }>
            <p>Do you want to proceed and delete this place ? Please note that it cannot be undone thereafter.</p>
        </Modal>
    <li className="place-item">
        <Card className="place-item__content">
            {isLoading&&<LoadingSpinner asOverlay/>}
        <div className="place-item__image">
            <img src={`http://localhost:5000/${props.image}`} alt={props.title}/>
        </div>
        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.userId === props.creatorId &&
            <Button to={`/places/${props.id}`}>EDIT</Button>}
            {auth.userId === props.creatorId && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
        </div>
        </Card>
    </li>
    </React.Fragment>
    );
};

export default PlaceItem;