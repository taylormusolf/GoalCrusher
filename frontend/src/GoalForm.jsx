import React, { useState } from 'react';
import { createGoal, getUsers } from './api_util';


const GoalForm = () => {
    const [goal, setGoal] = useState('');

    const handleGoalChange = (e) => {
        setGoal(e.target.value);
    };

    const handleSuggestion = async e => {
        e.preventDefault();
        // const res = await api.post('/chat', {message: 'get suggestion'})
    }
    const handleOther = async e => {
        e.preventDefault();
        getUsers();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createGoal(goal)
        // Reset the form
        setGoal('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={goal} onChange={handleGoalChange} />
                <button type="submit">Create Goal</button>
            </form>
            <button onClick={handleSuggestion}>Get suggestion</button>
            <button onClick={handleOther}>Get other</button>
        </>
    );
};

export default GoalForm;