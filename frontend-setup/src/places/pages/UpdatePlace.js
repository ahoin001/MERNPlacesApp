import React, { useEffect, useState } from 'react'
import useForm from '../../shared/components/hooks/form-hook'
import { useParams } from 'react-router-dom'

import { useHttpClient } from '../../shared/components/hooks/http-hook'

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/components/Util/Validator";
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';


import './PlaceForm.css'

const UpdatePlace = props => {

    const { sendRequest, clearError, error, isLoading } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState()

    // Get the parameter/argument from :placeId in  /place/:placeId link
    const placeId = useParams().placeId

    // Form State will be returned state of this components form
    // Input Handler used to update state given to useFrom Hook
    // 
    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
        },
        false
    );

    // Find the place the user wants to edit by ID
    useEffect(() => {

        const fetchPlace = async () => {

            try {

                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);

                console.log(`RESPONSE#######:`, responseData.place)

                setLoadedPlace(responseData.place);

                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                },
                    true);

            } catch (error) {

            }

        }

        fetchPlace();

    }, [sendRequest, placeId, setFormData])



    const placeUpdateSubmitHandler = (e) => {


        e.preventDefault();

        console.log(formState.inputs)

    }

    if (isLoading) {
        return (

            <div className='center'>

                <LoadingSpinner />

            </div>

        )
    }

    if (!loadedPlace && !error) {

        return (

            <Card>
                <div className='center'>
                    <h2>COULD NOT FIND REQUESTED PLACE</h2>
                </div>
            </Card>
        )

    }




    return (

        <React.Fragment>

            <ErrorModal error={error} onClear={clearError} />

            {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>

                {/* All Inputs change different properties of the component state */}

                <Input
                    id='title'
                    element='input'
                    type='text'
                    label='Title'
                    // VALIDATOR CHECKS IF INPUT IS EMPTY 
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText='Please Enter a valid title'
                    initialValue={formState.inputs.title.value}
                    initialValid={formState.isValid}
                />

                <Input
                    id="description"
                    element='textarea'
                    type="text"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description with at least 5 characters"
                    onInput={inputHandler}
                    initialValue={formState.inputs.description.value}
                    initialValid={true}
                />

                <Button type='submit' disabled={!formState.isValid} >
                    UPDATE PLACE
            </Button>

            </form>}

        </React.Fragment>



    );


}

export default UpdatePlace
