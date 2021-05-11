import { getTeams } from "../databaseAccess.js"
import { newPlayerForm } from "./PlayerProvider.js"

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

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {

    if (clickEvent.target.id === "submitTeam") {

        // grab user input
        const inputTeamName = document.querySelector("input[name='teamName']").value
        const creationDate = Date.now()

        // generate new id
        const teamsArray = getTeams()
        const newTeamId = teamsArray.length + 1;
    
        const DataForAPI = {
            dateCreated: creationDate,
            name: inputTeamName,
            id: newTeamId
        }
        // call Post API function on sendDataToAPI
        sendTeamToAPI(DataForAPI)
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