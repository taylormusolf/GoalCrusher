import { useEffect, useState } from 'react'
import './App.scss'
import GoalIndex from './GoalIndex'
import image from '../assets/dumbbells.png'
import { getQuote } from '../api_util'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [quote, setQuote] = useState('');
  useEffect(()=> {
    getQuote().then(newQuote => setQuote(newQuote.quote))
  }, [])
  return (
    <main>
      <section className='content'>
        <section className='title-section'>
          <img className='logo' src={image} alt='logo' />
          <h1>Goal Crusher</h1>
          <p className='quote'>{quote}</p>
        </section>
        <GoalIndex />
      </section>
      <footer>©2024 Taylor Musolf</footer>
      <ToastContainer position="bottom-center"
      transition: Slide/>
    </main>
  )
}

export default App
