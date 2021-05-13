// get current list of teams from app state in database
import { getTeams, getTeam1CurrentScore, getTeam2CurrentScore, getTeam3CurrentScore, setTeam1score, setTeam2score, setTeam3score, getCurrentRound, setCurrentRound, sendCurrentScores, } from "../databaseAccess.js"
import { currentGame } from "../Stats/Score.js";

const mainContainer = document.querySelector("#container")

// Display the score entry fields with corresponding team names
export const scoreProvider = () => {
    const teams = getTeams()
    const team1current = getTeam1CurrentScore()
    const foundTeam1 = teams.find(team => team.id === team1current.teamId)
    const team2current = getTeam2CurrentScore()
    const foundTeam2 = teams.find(team => team.id === team2current.teamId)
    const team3current = getTeam3CurrentScore()
    const foundTeam3 = teams.find(team => team.id === team3current.teamId)

    let html = `
    <div class="field">
        <label class="label" for="teamScore">${foundTeam1.name} Score:</label>
        <input type="text" name="team1Score" id="team1Score"/>
    </div>
    <div class="field">
        <label class="label" for="teamScore">${foundTeam2.name} Score:</label>
        <input type="text" name="team2Score" id="team2Score"/>
    </div>
    <div class="field">
        <label class="label" for="teamScore">${foundTeam3.name} Score:</label>
        <input type="text" name="team3Score" id="team3Score"/>
    </div>
 
    <button class="button" id="submitScores">Submit Score</button> 
    
    `
    return html
}


// Grab all 3 scores and send them to application state?
mainContainer.addEventListener(
    "click",
    (clickEvent) => {
        if (clickEvent.target.id === 'submitScores') {
            
            const team1score = document.querySelector("input[name='team1Score']").value
            const team2score = document.querySelector("input[name='team2Score']").value
            const team3score = document.querySelector("input[name='team3Score']").value

            const team1scoreINT = parseInt(team1score)
            const team2scoreINT = parseInt(team2score)
            const team3scoreINT = parseInt(team3score)
            
            if (team1scoreINT < 0 || typeof team1scoreINT === "string" || isNaN(team1scoreINT)) {
                alert("Score fields cannot be empty and must be an integer!")
                return
            }
            else if (team2scoreINT < 0 || typeof team2scoreINT === "string" || isNaN(team2scoreINT)) {
                alert("Score fields cannot be empty and must be an integer!")
                return
            }
            else if (team3scoreINT < 0 || typeof team3scoreINT === "string" || isNaN(team3scoreINT)) {
                alert("Score fields cannot be empty and must be an integer!")
                return
            }
            else {
            gameRoundIncrement()
            setTeam1score(parseInt(team1score))
            setTeam2score(parseInt(team2score))
            setTeam3score(parseInt(team3score))
            const gamePlay = document.querySelector(".game__play")
            gamePlay.innerHTML = `
        ${scoreProvider()}
        ${printCurrentRound()}
        ${currentGame()}`
    }
        }
    }
)


// increment state variable by 1 
export const gameRoundIncrement = () => {
    let currentRound = getCurrentRound()
    let roundIncrement = currentRound += 1
    setCurrentRound(roundIncrement)

}

// HTML representation of current round bean counter
export const printCurrentRound = () => {
    const currentRound = getCurrentRound()
    let html = `<div class="field">Round ${currentRound}</div>`
    return html
}

// custom event that dispatches once the game has finished round 3.
mainContainer.addEventListener(
    "click",
    (clickEvent) => {
        const currentRound = getCurrentRound()
        if (clickEvent.target.id === 'submitScores' && currentRound > 3) {
            const team1CurrentScore = getTeam1CurrentScore()
            team1CurrentScore.timestamp = Date.now()
            sendCurrentScores(team1CurrentScore)
        }
    }
)
