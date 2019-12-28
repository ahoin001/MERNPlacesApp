import React, { useState } from 'react'

export const NewGoal = (props) => {

    const [enteredText, setEnteredText] = useState('');

    const addGoalButtonHandler = (e) => {

        // Prevents broswer default submit of sending form data to back end
        e.preventDefault();

        // Create new goal to add to list
        const newGoal = {
            id: Math.random().toString(),
            task: enteredText
        }

        console.log(newGoal)

        // Use function from parent to add it to goal items data
        props.onAddGoal(newGoal)

        // Set input value back to empty string
        setEnteredText('')
    }

    const textChangedHandler = (event) => {

        // Rerenders component with latest user input on each keystroke
        setEnteredText(event.target.value)

    }


    return (
        <form className="new-goal" onSubmit={addGoalButtonHandler}>

            <input
                onChange={textChangedHandler}
                value={enteredText}
                type="text" />
            <button type="submit"> Add Goal </button>

        </form>
    )
}
