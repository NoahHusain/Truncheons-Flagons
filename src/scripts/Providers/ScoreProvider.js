// get current list of teams from app state in database
import { getTeams, setTeam1score, setTeam2score, setTeam3score } from "../databaseAccess.js"
import { newPlayerForm } from "./PlayerProvider.js";
import { newTeamForm } from "./TeamProvider.js";
import { currentGame } from "../Stats/Score.js";

const mainContainer = document.querySelector("#container")

// could you grab team names like this? ${getTeams.teams[0]}
export const scoreProvider = () => {
    let html = `
    <div class="field">
        <label class="label" for="teamScore">Team 1 Score:</label>
        <input type="text" name="team1Score" class="teamScore"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">Team 2 Score:</label>
        <input type="text" name="team2Score" class="teamScore"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">Team 3 Score:</label>
        <input type="text" name="team3Score" class="teamScore"/>
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