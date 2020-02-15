import React, { useState, useContext } from 'react'

import AuthContext from "../../shared/components/context//auth-context"
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'

import './PlaceItem.css'

/*
    Component of <li> </li> that displays info of a place, used in PlaceList
*/
const PlaceItem = (props) => {

    const [showMap, setShowMap] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const auth = useContext(AuthContext)

    const openMapHandler = () => {
        setShowMap(true)
    }

    const closeMapHandler = () => {
        setShowMap(false)
    }

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = () => {
        console.log('WILL DELETE PLACE OH YEAH')
    }

    return (

        <React.Fragment>

            {/* Modal uses React Portal to be rendered in a different place, instead of above listitem.  */}
            {/* Achieves same look but is better semantically  */}

            {/* Google Maps Modal */}
            <Modal
                show={showMap}
                // note, on cancel is passed to modal, then to backdrop, this oncancel closes map handler , other closed drawer
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler} > CLOSE </Button>}
            >

                {/* Whatever is here will be passed to props.children in modal */}
                <div className="map-container" >

                    <Map
                        center={props.coordinates}
                        zoom={16}
                    />

                </div>

            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showConfirmModal}
                header="Are you sure?"
                footerClass="place-item__modal-actionsc"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}> CANCEL </Button>
                        <Button danger onClick={confirmDeleteHandler}> DELETE </Button>
                    </React.Fragment>
                }
            >

                <p>Are you sure you want to delete this place? It can not be undone later...</p>

            </Modal>

            <li className='place-item'>

                <Card className='place-item__content'>

                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>

                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>

                    <div className="place-item__actions">

                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
                        {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
                        

                    </div>

                </Card>

            </li>

        </React.Fragment>

    )
}

export default PlaceItem;