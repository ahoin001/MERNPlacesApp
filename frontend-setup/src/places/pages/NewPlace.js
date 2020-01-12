import React from 'react'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_REQUIRE } from "../../shared/components/Util/Validator";

import './NewPlace.css'

/*
    Page component where user can fill out form and add a nw place
*/
export const NewPlace = () => {

    return (
        <form className="place-form">

            <Input
                element='input'
                type='text'
                label='Title'
                // VALIDATOR CHECKS IF INPUT IS EMPTY 
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please Enter a valid title'
            />

        </form>
    )

}
