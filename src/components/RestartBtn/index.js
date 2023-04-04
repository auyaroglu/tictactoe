import { gameContext, useContext } from "../../Context"


const RestartBtn = () => {
    const {restart} = useContext(gameContext)
    
    return (
        <button className="restart" onClick={() => restart()}>Restart</button>
    )
}

export default RestartBtn