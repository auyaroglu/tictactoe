import { gameContext, useContext } from "../../Context"

const Scoreboard = () => {

    const {scoreboard} = useContext(gameContext)

    return (
        <div className="scoreboard">
            <strong>Scoreboard</strong>
            {scoreboard.map(item => item)}
        </div>
    )
}

export default Scoreboard