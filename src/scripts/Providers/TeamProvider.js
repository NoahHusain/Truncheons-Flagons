import { getTeams, getScores, getPlayers } from "../databaseAccess.js"

// render function for new team form
export const newTeamForm = () => {
    let html = `
    <div class="field">
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

        // checkpoint to see whether input team name is already in the JSON database
        for (let i = 0; i < teamsArray.length; i++) {
            if (teamsArray[i].name === inputTeamName) {
                alert("Team name already in use")
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

        // // create new player to associate with team, 0 at this time
        // const playerArray = getPlayers()
        // const newPlayerId = playerArray.length + 1
        // const newPlayer = {
        //     id: newPlayerId,
        //     firstName: "",
        //     lastName: "",
        //     country: "",
        //     teamId: newTeamId,
            
        // }

        // sendPlayerToAPI(newPlayer)
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

// const sendPlayerToAPI = (playerObject) => {
//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(playerObject)
//     }

//     return fetch("http://localhost:8088/players", fetchOptions)
//         .then(response => response.json())
//         .then(() => {
//             mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
//         })
// }