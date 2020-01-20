import React, { useState } from 'react'

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

    const openMapHandler = () => {
        setShowMap(true)
    }

    const closeMapHandler = () => {
        setShowMap(false)
    }


    return (

        <React.Fragment>

            {/* Modal uses React Portal to be rendered in a different place, instead of above listitem.  */}
            {/* Achieves same look but is better semantically  */}

            <Modal
            
                show={showMap}
                // note, on cancel is passed to modal, then to backdrop, this oncancel closes map handler , other closed drawer
                onCancel={closeMapHandler}
                header={props.adress}
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

            <li className='place-item'>

                <Card className='place-item__content'>

                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>

                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.adress}</h3>
                        <p>{props.description}</p>
                    </div>

                    <div className="place-item__actions">

                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>

                    </div>

                </Card>

            </li>

        </React.Fragment>

    )
}

export default PlaceItem;