import React from 'react';
import GoalList from './GoalList'

import './App.css'

const App = () => {

  const goalItems = [
    {id: 'g1', task: 'Understand React Workflow'},
    {id: 'g2', task: 'Understand Express Node workflow'},
    {id: 'g3', task: 'Be able to create MERN App'}
  ]

  return (
    <div className="course-goals">

      <h2>Course Goals</h2>

      <GoalList List={goalItems} />

    </div>

  )

};

export default App;
