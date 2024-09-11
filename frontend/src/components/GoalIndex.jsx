import React, { useEffect, useState } from 'react';
import { getUserGoals, deleteGoal, modifyGoal } from '../api_util';
import { useGoals } from '../context/GoalsContext';
import Modal from 'react-modal';
import GoalForm from './GoalForm'
import GoalSuggestion from './GoalSuggestion';

Modal.setAppElement('#root');

const GoalIndex = () => {
    const { goals, getGoals, removeGoal,updateGoal } = useGoals(); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedGoalId, setSelectedGoalId] = useState('');
    const [selectedGoalTitle, setSelectedGoalTitle] = useState('');
    const [selectedGoalDescription, setSelectedGoalDescription] = useState('');
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        //fetch goals based on user Id
        getUserGoals(1)
        .then(goals => getGoals(goals.sort((a,b) => a.id - b.id))) //sort the goals for consistent order
        .then(_ => setLoading(false))
    }, [])

    const handleStatusChange = (goal) => async e => {
        const res = await modifyGoal({...goal, status: e.target.value})
        updateGoal(res);
    }

    const handleRemoveGoal = async goal_id => {
        const res = await deleteGoal(goal_id)
        removeGoal(goal_id);
        setShowDeleteModal(false);
    }
    const handleDeleteModal = (id, title) => {
        setSelectedGoalId(id);
        setSelectedGoalTitle(title);
        setShowDeleteModal(true)
    }
    const handleGoalClick = (goal) => {
        setShowInfoModal(true);
        setSelectedGoalId(goal.id);
        setSelectedGoalTitle(goal.title);
        setSelectedGoalDescription(goal.description);
    }
    return (
        <section className='goal-index'>
            <div className='goal-index-header'>
                <h2>My Goals</h2>
                <GoalForm />
                <GoalSuggestion />
            </div>
            {loading ? 
                <div className='goal-placeholder'>Loading...</div> : 
            !goals.length ? (
                <div className='goal-placeholder'>Create Some Goals to Crush!</div>
            ) : (
                goals?.map((goal) => (
                    <div className='goal' key={goal.id}>
                        <h3 style={{cursor: 'pointer', textDecoration: goal.status === 'completed' ? 'line-through' : ''}} onClick={()=> handleGoalClick(goal)}>{goal.title}</h3>
                        <select name="" id="" defaultValue={goal.status} onChange={handleStatusChange(goal)}>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="not-started">Not Started</option>
                        </select>
                        <button onClick={()=> handleDeleteModal(goal.id, goal.title)}>Delete Goal</button>
                    </div>
                ))

            )}
            <Modal
                isOpen={showDeleteModal}
                onRequestClose={()=> setShowDeleteModal(false)}
                contentLabel="Add a Goal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div>
                    <p>Are you sure you want to delete the <strong>{selectedGoalTitle}</strong> goal?</p>
                    <button onClick={()=> handleRemoveGoal(selectedGoalId)}>Yes</button>
                    <button onClick={()=> setShowDeleteModal(false)}>No</button>
                </div>
            </Modal>
            <Modal
                isOpen={showInfoModal}
                onRequestClose={()=> setShowInfoModal(false)}
                contentLabel="Goal Info"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div>
                    <p><strong>{selectedGoalTitle}</strong></p>
                    <p>{selectedGoalDescription}</p>
                </div>
            </Modal>
        </section>
    );
};

export default GoalIndex;