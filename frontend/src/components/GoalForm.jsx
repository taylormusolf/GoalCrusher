import React, { useState } from 'react';
import { createGoal, getUsers } from '../api_util';
import { useGoals } from '../context/GoalsContext';

const GoalForm = () => {
    const { addGoal } = useGoals(); 
    const [goal, setGoal] = useState({title: '', description: '', status: "not-started"})

    const handleFieldChange = field => e => {
        setGoal(prev => {return {...prev, [field]: e.target.value}});
    };

    const handleSuggestion = async e => {
        e.preventDefault();
        // const res = await api.post('/chat', {message: 'get suggestion'})
    }
    const handleOther = async e => {
        e.preventDefault();
        getUsers();
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newGoal = await createGoal(goal)
        addGoal(newGoal)
        // Reset the form
        setGoal({title: '', description: '', status: "not-started"});
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" value={goal.title} onChange={handleFieldChange('title')} />
                <label>Description</label>
                <input type="text" value={goal.description} onChange={handleFieldChange('description')} />
                <label>Status</label>
                <select name="" id="" defaultValue={goal.status} onChange={handleFieldChange('status')}>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="not-started">Not Started</option>
                </select>

                <button type="submit">Create Goal</button>
            </form>
            <button onClick={handleSuggestion}>Get suggestion</button>
            <button onClick={handleOther}>Get other</button>
        </>
    );
};

export default GoalForm;