import React, { useCallback, useReducer } from 'react'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/components/Util/Validator";
import Button from '../../shared/components/FormElements/Button';

import './NewPlace.css'

const formReducer = (state, action) => {

    switch (action.type) {

        case 'INPUT_CHANGE':
            let formIsValid = true;

            // input id will be the name of properties in state.inputs
            for (let inputId in state.inputs) {

                // checks if the name of the property is same as input from action 
                if (inputId === action.inputId) {

                    // if form is valid is true if formIsValid and action.isValid are true
                    formIsValid = formIsValid && action.isValid;
                }

                else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {

                ...state,

                // and then over ride properties
                input: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
                // isValid: validate(action.val, action.validators)
            }

        case 'DESCRIPTION':
            return {
                // Copy of previous state
                ...state,
                // over ride necessary properties
                isTouched: true,

            }

        default:
            return state;

    }
}

/*
    Page component where user can fill out form and add a nw place
*/
export const NewPlace = () => {

    // inputs keeps track of validity of multiple inputs, isValid for if overall form is valid
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    })

    // Recieves id to find, value to replace, and isValid to make sure its okay
    // useCallback make sure component reuses this function on rerender instead of causing infinite loop with useEffect in 
    const inputHandler = useCallback((id, value, isValid) => {

        // Passes action object to reducer function
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })

    }, [])

    return (
        <form className="place-form">

            <Input
                id='title'
                element='input'
                type='text'
                label='Title'
                // VALIDATOR CHECKS IF INPUT IS EMPTY 
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText='Please Enter a valid title'
            />

            <Input
                id='description'
                element='textarea'
                label='Description'
                // VALIDATOR CHECKS IF INPUT IS EMPTY 
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                errorText='Please Enter a valid description(at least 5 characters).'
            />

            <Button type='submit' disabled={!formState.isValid}> ADD PLACE </Button>

        </form>
    )

}
