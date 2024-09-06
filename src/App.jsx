/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/


// eslint-disable-next-line no-unused-vars
/*
import React from 'react'
import './App.css'

function App() {
    return (
        <div className="app">
            <header>
                <div className="dots">
                    <span className="dot green"></span>
                    <span className="dot yellow"></span>
                    <span className="dot red"></span>
                    <span className="dot blue"></span>
                </div>
            </header>
            <main>
                <div className="content">
                    <h1>A <span className="highlight">21 years old</span><br />interaction designer</h1>
                    <p className="contact-info">
                        hello@youremail.com<br />
                        +1234567890
                    </p>
                    <div className="buttons">
                        <button className="btn primary">View my bucket list</button>
                        <button className="btn secondary">Tell me a secret</button>
                        <button className="btn tertiary">Download my résumé</button>
                    </div>
                </div>
                <div className="model-container">
                    {/!* 3D model will go here *!/}
                </div>
            </main>
            <footer>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Codepen</a>
                <a href="#">GitHub</a>
            </footer>
        </div>
    )
}

export default App*/


// eslint-disable-next-line no-unused-vars
import React from 'react'
import LandingPage from './components/LandingPage'

function App() {
    return (
        <LandingPage />
    )
}

export default App