import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

/*
    Page that displays list of users
*/

const Users = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [loadedUsers, setLoadedUsers] = useState()


    // set useEffect in a way this will only run time and not on every rerender
    // useEffect DOES NOT want a function that returns a promise, so cant use async/await directly 
    useEffect(() => {

        // use IIFE (Immediately Invoked Function Expression) and apply async for async task
        const sendRequest = async () => {

            try {

                // By default fetch is get request, and does not requre headers or data to post 
                const response = await fetch(`http://localhost:5000/api/users`);

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message)
                }

                // Can check response from backend for why we picked users property in response
                setLoadedUsers(responseData.users)

            } catch (error) {

                // message property of error object thrown in try
                setError(error.message)

            }

            setIsLoading(false)

        }

        sendRequest();

    }, [])

    const errorHandler = () => {
        setError(null)
    }


    return (

        <React.Fragment>

            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">

                    <LoadingSpinner />

                </div>
            )}

            {/* Render User When we have users from fetch request */}
            {loadedUsers && <UsersList
                items={loadedUsers}
            />}

        </React.Fragment>



    )
}

export default Users