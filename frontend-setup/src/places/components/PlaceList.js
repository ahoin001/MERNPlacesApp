import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'

import './PlaceList.css'

/*
    Component that displays list of PlaceItem components
*/
const PlaceList = (props) => {


    // If no places, return this card
    if (props.items.length === 0) {
        return <div className="place-list center">

            <Card>
                <h2>No places found, would you like to create one?</h2>
                <button> Share Place </button>
            </Card>

        </div>
    }

    return (

        <ul className="place-list">

            {/* A seperate component handles and returns a card using each item from the data */}
            {props.items.map(place =>
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    adress={place.adress}
                    creatorId={place.creator}
                    coordinates={place.location}

                />)}

        </ul>

    )

}

export default PlaceList;