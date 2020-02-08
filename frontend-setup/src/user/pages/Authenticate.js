import React, { useState, useContext } from 'react'

import AuthContext from "../../shared/components/context/auth-context"
import Input from '../../shared/components/FormElements/Input'
import useForm from '../../shared/components/hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../shared/components/Util/Validator";
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import './Auth.css'
import Card from '../../shared/components/UIElements/Card';

/*
    Page component where user Can sign up or sign in
*/
const Authenticate = props => {

    // Import our context then use it with hook
    const auth = useContext(AuthContext);

    // State to determine if in Login mode or not
    const [isLoginMode, setisLoginMode] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState()

    // Use custom hook for formHandling our custom Input components
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }

    },
        false)

    const authSubmitHandler = async event => {

        event.preventDefault();

        // Before sending request, setstate to have loading shown to user to have feedback on submission
        setIsLoading(true);

        if (isLoginMode) {

            try {

                const response = await fetch(`http://localhost:5000/api/users/login`, {
                    method: "POST",
                    headers: {           //Will tell backend what type of data it will recieve
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        // Data expected by backend/api
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value

                    })
                })

                // Response won't be in json format so we parse it to be usable
                const responseData = await response.json()
                console.log(responseData)

                // TODO NOTE* Fetch will not go to catch block even when response contains 404 or 500's error
                // So manually throw error if response has an error attatched, checked by .ok property
                if (!response.ok) {

                    // Create error with errror message from the response ( In backend the response has .message property with error description)
                    // Our controllers throw httperror objects with message that can be called for specific error messages
                    throw new Error(responseData.message)

                }

                // Loading will be complete one async task above is complete
                setIsLoading(false)

                // Login using context so all components listening will know
                auth.login();

                // ANY ERROR THROWN IS AUTOMATICALLY AN ARGUMENT FOR CATCH NAME DOES NOT MATTER
            } catch (err) {

                // Stop loading and provide error message for error modal that calls error from state
                setIsLoading(false);
            
                setError(err.message || 'Something went wrong, please try again.');
            
            }

        } else {

            // Attempt signup
            try {

                setIsLoading(true);

                const response = await fetch(`http://localhost:5000/api/users/signup`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value

                    })
                })

                const responseData = await response.json()
                // console.log(responseData)

                if (!response.ok) {

                    throw new Error(responseData.message)

                }

                setIsLoading(false)
                auth.login();

            } catch (err) {

                setIsLoading(false)
                setError(err.message || 'Something went wrong with sign up.')

            }

        }

    }

    const switchModeHandler = () => {

        // If in sign up, before switching to login mode remove name from state
        // and make login form valid if email and password are already valid
        if (!isLoginMode) {

            setFormData(
                {
                    // Carry over inputs that were already made
                    ...formState.inputs,

                    // TODO set to undefined to drop property from state
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            )

        }
        // from login to sign up, create a name property in state
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },
                false)
        }

        // toggle loginMode
        setisLoginMode(prevMode => !prevMode)
    }

    // Clears errors from state
    const errorHandler = () => {
        setError(null)
    }



    return (

        <React.Fragment>

            {/* Error from state */}
            <ErrorModal error={error} onClear={errorHandler} />

            <Card className="authentication">

                {isLoading && <LoadingSpinner asOverlay />}

                <h2> Login Required</h2>
                <hr />

                <form onSubmit={authSubmitHandler}>

                    {!isLoginMode &&
                        <Input
                            id='name'
                            element='input'
                            type='text'
                            label='Name'
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            errorText='Please Enter a name'
                        />}

                    <Input
                        id='email'
                        element='input'
                        type='email'
                        label='Email'
                        validators={[VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText='Please Enter a valid email'
                    />

                    <Input
                        id='password'
                        element='input'
                        type='text'
                        label='Password'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        onInput={inputHandler}
                        errorText='Please Enter a valid password: Must Be at least 5 characters'
                    />

                    <Button disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                    </Button>

                </form>

                <Button inverse onClick={switchModeHandler}> SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'} </Button>

            </Card>

        </React.Fragment>

    )

}

export default Authenticate
