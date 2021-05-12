// get current list of teams from app state in database
import { getTeams, getTeam1CurrentScore, getTeam2CurrentScore, getTeam3CurrentScore, setTeam1score, setTeam2score, setTeam3score, getCurrentRound, setCurrentRound } from "../databaseAccess.js"
import { newPlayerForm } from "./PlayerProvider.js";
import { newTeamForm } from "./TeamProvider.js";
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
        if (clickEvent.target.id === 'submitScores'){
            gameRoundIncrement()
            const team1score = document.querySelector("input[name='team1Score']").value
            const team2score = document.querySelector("input[name='team2Score']").value
            const team3score = document.querySelector("input[name='team3Score']").value
            setTeam1score(parseInt(team1score))
            setTeam2score(parseInt(team2score))
            setTeam3score(parseInt(team3score))
            mainContainer.innerHTML = `
            <h1>Truncheons and Flagons</h1>
    <div class="truncheons__container">
    <article class="choices">
        <section class="new__player">
            <h2>New Player</h2>
            ${newPlayerForm()}
        </section>
        <section class="new__team">
            <h2>New Team</h2>
            ${newTeamForm()}
        </section>
        </article>
        
        <section class="game__play">
        ${scoreProvider()}
        ${printCurrentRound()}
        ${currentGame()}
        </section>

        <section class="new__leaderboard">
            <h2>Leaderboard</h2>
        </section>
    </div>`
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

// custom event that dispatches once the game has finished round 3 that renders new page with finished game.

