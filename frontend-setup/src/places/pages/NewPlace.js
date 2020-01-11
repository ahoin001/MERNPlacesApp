import React from 'react'

import Input from '../../shared/components/FormElements/Input'

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
                label='title'
            />

        </form>
    )

}
