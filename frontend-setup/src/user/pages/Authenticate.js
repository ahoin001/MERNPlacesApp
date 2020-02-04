import React, { useState, useContext } from 'react'

import AuthContext from "../../shared/components/context/auth-context"
import Input from '../../shared/components/FormElements/Input'
import useForm from '../../shared/components/hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../shared/components/Util/Validator";
import Button from '../../shared/components/FormElements/Button';

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

        console.log(formState.inputs)

        if (isLoginMode) {



        } else {

            try {

                // Use fetch (built in api) to make request to backend/external api
                const response = await fetch(`http://localhost:5000/api/users/signup`, {
                    method: "POST",
                    headers: {           //Will tell backend what type of data it will recieve
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        // Data expected by backend/api
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value

                    })
                })
            
                // Response won't be in json format so we parse it to be usable
                const responseData = await response.json()

                console.log(responseData)
            } catch (error) {

            }

        }

        auth.login();

    }

    const switchModeHandler = () => {

        // If in sign up, before switching to login mode remove name from state
        // and make login form valid if email and password are already valid
        if (!isLoginMode) {

            setFormData(
                {

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

        // argument will toggle loginMode
        setisLoginMode(prevMode => !prevMode)
    }


    return (

        <Card className="authentication">

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

    )

}

export default Authenticate
