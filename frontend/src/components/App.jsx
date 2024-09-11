import { useEffect, useState } from 'react'
import './App.scss'
import GoalIndex from './GoalIndex'
import image from '../assets/dumbbells.png'
import { getQuote } from '../api_util'

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
          <p>{quote}</p>
        </section>
        <GoalIndex />
      </section>
      <footer>Taylor Musolf</footer>
    </main>
  )
}

export default App
