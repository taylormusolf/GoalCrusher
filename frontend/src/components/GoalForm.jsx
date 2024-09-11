import React, { useState } from 'react';
import { createGoal, getUsers, getGoalSuggestion } from '../api_util';
import { useGoals } from '../context/GoalsContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const GoalForm = () => {
    const { addGoal } = useGoals(); 
    const [showModal, setShowModal] = useState(false);
    const [goal, setGoal] = useState({title: '', description: '', status: "not-started"})

    const handleFieldChange = field => e => {
        setGoal(prev => {return {...prev, [field]: e.target.value}});
    };

    const handleSuggestion = async e => {
        e.preventDefault();
        const res = await getGoalSuggestion();
        setGoal({...goal, title: res.title, description: res.description})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newGoal = await createGoal(goal)
        addGoal(newGoal)
        setGoal({title: '', description: '', status: "not-started"});
        setShowModal(false);
    };

    return (
        <>
            <button onClick={()=> setShowModal(true)}>Add a Goal</button>
            <Modal
                isOpen={showModal}
                onRequestClose={()=> setShowModal(false)}
                contentLabel="Add a Goal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <form className='goal-form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='goal-title'>Title</label>
                        <input id='goal-title' type="text" value={goal.title} onChange={handleFieldChange('title')} />
                    </div>
                    <div>
                        <label htmlFor='goal-desc'>Description</label>
                        <textarea id='goal-desc' type="text" value={goal.description} onChange={handleFieldChange('description')} />
                    </div>
                    <div>
                        <label htmlFor='goal-status'>Status</label>
                        <select id='goal-status' defaultValue={goal.status} onChange={handleFieldChange('status')}>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="not-started">Not Started</option>
                        </select>
                    </div>
                    <button onClick={handleSuggestion}>Get a suggestion</button>
                    <div className='goal-buttons'>
                        <button type="submit">Create Goal</button>
                        <button type="button" onClick={()=> setShowModal(false)}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default GoalForm;