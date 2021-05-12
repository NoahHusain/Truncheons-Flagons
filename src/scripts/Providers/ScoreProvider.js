// get current list of teams from app state in database
import { getTeam1CurrentScore, getTeam2CurrentScore, getTeams, postScores, setScores } from "../databaseAccess.js"

const teams = getTeams()
const getTeam1ID = getTeam1CurrentScore()
const mainContainer = document.querySelector("#container")

export const findTeamName = () => {
    for (const team of teams) {
        if(team.id === '1')
        return 'Windhelm'
    }
}

// could you grab team names like this? ${getTeams.teams[0]}
export const scoreProvider = () => {
    let html = `
    <div class="field">
        <label class="label" for="teamScore">${findTeamName()} Score:</label>
        <input type="text" name="teamScore" id="team1Score"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">Team 2 Score:</label>
        <input type="text" name="teamScore" id="team2Score"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">Team 3 Score:</label>
        <input type="text" name="teamScore" id="team3Score"/>
    </div>
 
    <button class="button" id="submitScores">Submit Score</button> 
    <button class="button" id="submitScoresCloud">Submit Scores to Cloud</button> 

    
    `
    return html
}

// sendDataToAPI


// Empty array where scores will be stored
const scores = []

// Capture number input in score field 1
mainContainer.addEventListener(
    "keyup",
    (event) => {
        if (event.target.id === 'team1Score'){
            scores.team1Score = parseInt(event.target.value)

        }
    }
)

// Capture number input in score field 2
mainContainer.addEventListener(
    "keyup",
    (event) => {
        if (event.target.id === 'team2Score'){
            scores.team2Score = parseInt(event.target.value)

        }
    }
)

// Capture number input in score field 3
mainContainer.addEventListener(
    "keyup",
    (event) => {
        if (event.target.id === 'team3Score'){
            scores.team3Score = parseInt(event.target.value)

        }
    }
)


// Grab all 3 scores and send them to application state?
mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === 'submitScores'){
            setScores(scores.team1Score, scores.team2Score, scores.team3Score)

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

