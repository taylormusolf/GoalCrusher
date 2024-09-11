import { useState } from 'react';
import Modal from 'react-modal';
import { getGoalSuggestionsViaPrompt, createGoal } from '../api_util';
import { useGoals } from '../context/GoalsContext';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const GoalSuggestion = () => {
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [prompt, setPrompt] = useState('')
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const { addGoal } = useGoals(); 

    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        const res = await getGoalSuggestionsViaPrompt(prompt);
        setGoals(res.goals);
        setLoading(false);
    }
    const handleCreateGoal = goal => async(e) => {
        e.preventDefault();
        const newGoal = await createGoal({...goal, status:'not-started'});
        addGoal(newGoal);
        toast("Goal Added!")
    };

    return(
        <>
            <button onClick={()=> setShowSuggestionModal(true)}>Need a suggestion?</button>
            <Modal
                isOpen={showSuggestionModal}
                onRequestClose={()=> setShowSuggestionModal(false)}
                contentLabel="Goal Suggestions"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div>
                    <p>What are you trying to accomplish?</p>
                    <form onSubmit={handleSubmit}>
                        <input required value={prompt} onChange={e => setPrompt(e.target.value)}/>
                        <button style={{padding:'5px'}}>Get Suggestions</button>
                    </form>
                    { loading ? <div>Loading...</div> : goals?.map((goal, i) => (
                        <ul style={{padding:'10px'}} key={i}>
                            <li><strong>{goal.title}</strong></li>
                            <li>{goal.description}</li>
                            <button onClick={handleCreateGoal(goal)} style={{padding:'2px'}}>Add to My Goals</button>
                        </ul>
                    ))

                    }
                </div>
            </Modal>
        </>
    )

}

export default GoalSuggestion;