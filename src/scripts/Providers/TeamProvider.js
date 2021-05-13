import { getTeams, getScores, getPlayers } from "../databaseAccess.js"

// render function for new team form
export const newTeamForm = () => {
    let html = `
    <div class="team__field">
        <label class="label" for="teamName">Team Name</label>
        <input type="text" name="teamName" class="input"/>
    </div>
 
    <button class="button" id="submitTeam">Create Team</button> 
    `
    return html
}


// Event Listener for submitTeam click event
const mainContainer = document.querySelector("#container")
mainContainer.addEventListener("click", clickEvent => {

    if (clickEvent.target.id === "submitTeam") {

        // grab user input
        const inputTeamName = document.querySelector("input[name='teamName']").value
        const creationDate = new Date(Date.now()).toLocaleString("en-US")
        
        const teamsArray = getTeams()
        const newTeamId = teamsArray.length + 1
        const DataForAPI = {
            dateCreated: creationDate,
            name: inputTeamName,
            id: newTeamId,
            playerCount: 0
        }
        // call Post API function on sendDataToAPI
        sendTeamToAPI(DataForAPI)

        // create new score card to associate with team, blank at this time
        const scoreArray = getScores()
        const newScoreId = scoreArray.length + 1
        const scoreCard = {
            id: newScoreId,
            teamId: newTeamId,
            score: 0,
            timestamp: Date.now()
        }

        sendScoreToAPI(scoreCard)
    }
})

const sendTeamToAPI = (teamObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamObject)
    }

    return fetch("http://localhost:8088/teams", fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

const sendScoreToAPI = (scoreObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreObject)
    }

    return fetch("http://localhost:8088/scores", fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
