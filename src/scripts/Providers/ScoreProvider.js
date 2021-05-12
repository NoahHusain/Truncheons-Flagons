// get current list of teams from app state in database
import { getTeams, postScores, setScores } from "../databaseAccess.js"

const mainContainer = document.querySelector("#container")

const foundTeam1 = teams.find(team => team.id === team1current.teamId)
const foundTeam2 = teams.find(team => team.id === team2current.teamId)
const foundTeam3 = teams.find(team => team.id === team3current.teamId)

// could you grab team names like this? ${getTeams.teams[0]}
export const scoreProvider = () => {
    let html = `
    <div class="field">
        <label class="label" for="teamScore">${foundTeam1.name} Score:</label>
        <input type="text" name="teamScore" id="team1Score"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">${foundTeam2.name} Score:</label>
        <input type="text" name="teamScore" id="team2Score"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">${foundTeam3.name} Score:</label>
        <input type="text" name="teamScore" id="team3Score"/>
    </div>
 
    <button class="button" id="submitScores">Submit Score</button> 
    <button class="button" id="submitScoresCloud">Submit Scores to Cloud</button> 

    
    `
    return html
}


// Grab all 3 scores and send them to application state?
mainContainer.addEventListener(
    "click",
    (clickEvent) => {
        if (clickEvent.target.id === 'submitScores'){
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
        ${currentGame()}
        </section>

        <section class="new__leaderboard">
            <h2>Leaderboard</h2>
        </section>
    </div>`
        }
    }
)

mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === 'submitScoresCloud'){
            postScores(setScores(scores.team1Score, scores.team2Score, scores.team3Score))

        }
    }
)

