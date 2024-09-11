import { useEffect, useState } from 'react'
import './App.scss'
import GoalIndex from './GoalIndex'
import image from '../assets/logo.webp'
import { getQuote } from '../api_util'

function App() {
  const [quote, setQuote] = useState('');
  useEffect(()=> {
    getQuote().then(newQuote => setQuote(newQuote.quote))
  }, [])
  return (
    <>
      <section className='title-section'>
        {/* <img className='logo' src={image} alt='logo' /> */}
        <h1>Goal Crusher</h1>
        <p>{quote}</p>
      </section>
      <GoalIndex />
    </>
  )
}

export default App
