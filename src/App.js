import { useState, useRef } from "react";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import RestartBtn from "./components/RestartBtn"
import { gameContext } from "./Context";
import { ImCross, ImRadioUnchecked } from "react-icons/im";
import Confetti from 'react-confetti'

function App() {
    const confettiRef = useRef(null)

    const [start, setStart] = useState(0)
    const [player, setPlayer] = useState("X")
    const [move, setMove] = useState([])
    const [scoreboard, setScoreboard] = useState([])
    const [xScore, setXscore] = useState(0)
    const [oScore, setOscore] = useState(0)
    const [gameCount, setGameCount] = useState(1)
    const [startConfetti, setStartConfetti] = useState(false)

    const restart = (showConfetti = false) => {
        const blocks = document.querySelectorAll(".block")
        blocks.forEach(block => block.removeAttribute("data-player"))
        if (showConfetti) {
            setStartConfetti(true)
            setTimeout(() => {
                setStartConfetti(false)
            }, 5000)
        } else
            setStartConfetti(false)

        setStart(0)
        setPlayer("X")
        setMove([])
    }

    const data = {
        start,
        setStart,
        player,
        setPlayer,
        move,
        setMove,
        scoreboard,
        setScoreboard,
        xScore,
        setXscore,
        oScore,
        setOscore,
        gameCount,
        setGameCount,
        restart
    }

    return (
        <gameContext.Provider value={data}>
            <div className="container">
                {startConfetti && <Confetti ref={confettiRef} width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} tweenDuration={10000} run={startConfetti} />}
                <h1>Tic Tac Toe</h1>
                <h3>{player === "X" ? <ImCross size={32} /> : <ImRadioUnchecked size={34} />} Player Turn</h3>
                <Gameboard />
                <RestartBtn />
                {scoreboard.length > 0 && <Scoreboard />}
            </div>
        </gameContext.Provider>
    );
}

export default App;
