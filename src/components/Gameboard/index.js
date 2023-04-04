import { useEffect } from "react"
import { gameContext, useContext } from "../../Context"
import { ImCross, ImRadioUnchecked } from "react-icons/im";

const Gameboard = () => {

    const { player, setPlayer, move, setMove, start, setStart, scoreboard, setScoreboard, xScore, setXscore, oScore, setOscore, gameCount, setGameCount, restart } = useContext(gameContext)

    // Victory conditions
    const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    let xPlayerMoves = []
    let oPlayerMoves = []

    const makeChoise = (item) => {
        if (start === 0)
            setStart(1)
        if (!item.dataset.player) {
            item.dataset.player = player
            setMove(
                [
                    ...move,
                    {
                        "move": item.dataset.block,
                        "player": player
                    }
                ]
            )
            setPlayer(player === "X" ? "O" : "X")
        }
    }

    const checkArray = (arr) => {
        let contains = false;

        for (let i = 0; i < conditions.length; i++) {
            let match = true;
            for (let j = 0; j < conditions[i].length; j++) {
                if (!arr.includes(conditions[i][j])) {
                    match = false;
                    break;
                }
            }
            if (match) {
                contains = true;
                break;
            }
        }

        return contains
    }

    const updateScoreBoard = winner => {     
        if (winner === "X") {
            setXscore(xScore + 1)
        } else {
            setOscore(oScore + 1)
        }
        setGameCount(gameCount + 1)        
    }

    const checkMove = () => {                
        move.filter(item => item.player === "X").map(xPlayer => {
            xPlayerMoves.push(parseInt(xPlayer.move))
        })
        move.filter(item => item.player === "O").map(oPlayer => {
            oPlayerMoves.push(parseInt(oPlayer.move))
        })
        if (checkArray(xPlayerMoves.sort())) {
            updateScoreBoard("X")
        }
        if (checkArray(oPlayerMoves.sort())) {
            updateScoreBoard("O")
        }     
        const blocks = document.querySelectorAll(".block[data-player]")
        if (blocks.length === 9) {
            restart()
        }
    }

    useEffect(() => {
        if (gameCount > 1) {
            setScoreboard([...scoreboard, <div key={gameCount}><ImCross /> <span>{xScore}:{oScore}</span> <ImRadioUnchecked /></div>])
            restart(true)
        }
    }, [xScore, oScore])

    useEffect(() => {
        checkMove()
    }, [move])

    let blocks = []
    const createBlocks = () => {
        for (let i = 0; i < 9; i++) {
            blocks.push(<div key={i} className="block" data-block={i} onClick={(e) => makeChoise(e.target)}></div>)
        }
        return blocks
    }

    return (
        <div className="gameboard">
            {createBlocks()}
        </div>
    )
}

export default Gameboard