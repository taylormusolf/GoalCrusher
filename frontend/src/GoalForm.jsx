import React, { useState } from 'react';
// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8000'
// })

const GoalForm = () => {
    const [goal, setGoal] = useState('');

    const handleGoalChange = (e) => {
        setGoal(e.target.value);
    };

    const handleSuggestion = async e => {
        e.preventDefault();
        // const res = await api.post('/chat', {message: 'get suggestion'})
        fetch('http://localhost:8000/chat', {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'get suggestion'
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        // setGoal(res);
    }
    const handleOther = async e => {
        e.preventDefault();
        fetch('http://localhost:8000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle the submission of the goal
        console.log('Goal submitted:', goal);
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