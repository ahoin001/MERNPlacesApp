// useState to have access to hooks 
//  They let you use state and other React features without writing a class.
import React, { useState } from 'react';
import GoalList from './components/GoalList/GoalList'
import { NewGoal } from "./components/NewGoal/NewGoal";

import './App.css'

const App = () => {

  // first constant holds latest state snapshot
  // second constant is function to manipulate state
  const [courseGoals, setCourseGoals] = useState([
    { id: 'g1', task: 'Understand React Workflow' },
    { id: 'g2', task: 'Understand Express Node workflow' },
    { id: 'g3', task: 'Be able to create MERN App' }
  ])

  // Recieves goal object, then creates new array to replace state
  const addNewGoalHandler = newGoal => {

    // SetCourse Goals wants a new array/object/etc to be returned and replace current one
    // concat will return new array, since our state is an array
    // could not use push because push modifies exsisting array
    // setCourseGoals(courseGoals.concat(newGoal))
    

    // Bulletproof way to do it and have all updates processed in order
    // Uses callback functions that recieves latest state, then provides new state
    setCourseGoals((prevCourseGoal) => {
      return prevCourseGoal.concat(newGoal)
    })

  }


  return (

    <div className="course-goals">

      <h2>Course Goals</h2>

      {/* onAddGoal is naming convention but could be anything (Write nice code alex) */}
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList List={courseGoals} />

    </div>

  )

};

export default App;
