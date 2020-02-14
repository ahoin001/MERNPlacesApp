import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/components/hooks/http-hook'

import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

/*
    Page component that contains components that list places
*/
const UserPlaces = (props) => {

    const [loadedPlaces, setLoadedPlaces] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // TO READ ROUTE PARAMETER
    // Gets whatver is provided in :userId of navlink url
    const userID = useParams().userId;

    // Check Users.js for comments on why written this way 
    useEffect(() => {

        const fetchPlaces = async () => {

            try {

                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userID}`);

                // Save returned list of places to state
                setLoadedPlaces(responseData.places)

            } catch (error) { }

        };

        fetchPlaces();

    }, [sendRequest, userID]);


    return (

        <React.Fragment>

            <ErrorModal error={error} onClear={clearError} />

            {isLoading && <div className='center'> <LoadingSpinner /> </div>}

            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}

        </React.Fragment>

    )
}

export default UserPlaces;