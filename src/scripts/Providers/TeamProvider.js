import { getTeams, getScores, getPlayers } from "../databaseAccess.js"
import { MessageBox } from "../MessageBox.js"

// render function for new team form
export const newTeamForm = () => {
    let html = `
    <div class="team__field">
        <label class="label" for="teamName">Team Name</label>
        <input type="text" name="teamName" class="input inputNewTeam"/>
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
        let inputTeamName = document.querySelector("input[name='teamName']").value

        //check to see if field is empty
        if (inputTeamName === "") {
            const newTeamField = document.querySelector(".inputNewTeam")
            newTeamField.style.background = "#fc7878"
            return
        }

        const creationDate = new Date(Date.now()).toLocaleString("en-US")
        
        const teamsArray = getTeams()

        // checkpoint to see whether input team name is already in the JSON database
        for (let i = 0; i < teamsArray.length; i++) {
            if (teamsArray[i].name === inputTeamName) {
                MessageBox("Team name already in use")
                return
            }
        }


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

    return fetch("Truncheons-API-dev.us-east-1.elasticbeanstalk.com/api/teams", fetchOptions)
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

    return fetch("Truncheons-API-dev.us-east-1.elasticbeanstalk.com/api/scores", fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
