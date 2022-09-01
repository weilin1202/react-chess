import React, { useState } from 'react'
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const { currentUser } = auth
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const newGameOptions = [
        { label: 'Black pieces', value: 'b' },
        { label: 'White pieces', value: 'w' },
        { label: 'Random', value: 'r' },
    ]

    function handlePlayOnline() {
        setShowModal(true)
    }


//firebase 
    async function startOnlineGame(startingPiece) {
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}` //generate random game ids
        }
        await db.collection('games').doc(game.gameId).set(game)
        navigate(`/game/${game.gameId}`) //push next game into html history
    }

    return (
        <>
            <div className="home">
                <div className="home-columns">
                    <h1>Queen's Gambit</h1>
                    <button className='button'
                        onClick={handlePlayOnline}>
                        Play Online
                    </button>
                </div> 
            </div>
            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                Please Select the piece you want to start
                            </div>

                        </div>
                        <footer className="card-footer">
                            {newGameOptions.map(({ label, value }) => (
                                <span className="card-footer-item pointer" key={value}
                                    onClick={() => startOnlineGame(value)}>
                                    {label}
                                </span>
                            ))}
                        </footer>
                    </div>
                </div>
                <button className="modal-close is-large" onClick={() => setShowModal(false)}></button>
            </div>
        </>
    )
}