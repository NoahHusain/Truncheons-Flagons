import { teamOptionList } from "../Lists/TeamList.js"
import { getPlayers } from "../databaseAccess.js"
 
// render function for new player form
export const newPlayerForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="firstName">First Name</label>
        <input type="text" name="firstName" class="input"/>
    </div>

    <div class="field">
        <label class="label" for="lastName">Last Name</label>
        <input type="text" name="lastName" class="input"/>
    </div>

    <div class="field">
        <label class="label" for="countryOfOrigin">Country of Origin</label>
        <input type="text" name="countryOfOrigin" class="input"/>
    </div>

    <div class="field">
        <label class="label" for="teamSelection">Select a team:</label>
        <select id="teamSelection" class="dropdownList">
            ${teamOptionList()}
            </select>
    </div>
 
 
    <button class="button" id="submitPlayer">Draft to Team</button> 
    `
    return html
}

// Event listener for submitPlayer click event
const mainContainer = document.querySelector("#container")
mainContainer.addEventListener("click", clickEvent => {

    if (clickEvent.target.id === "submitPlayer") {

        // grab user input
        const inputFirstName = document.querySelector("input[name='firstName']").value
        const inputLastName = document.querySelector("input[name='lastName']").value
        const inputCountry = document.querySelector("input[name='countryOfOrigin']").value
        
        // function to access id of option element below
        // Do I need an event listener here?

        const inputTeamId = parseInt(document.querySelector("#teamSelection").value)
        
        // check whether team already has three players
        const playersArray = getPlayers()
        let playerCounter = 0

        for (let i = 0; i < playersArray.length; i++) {
            if (playersArray[i].teamId === inputTeamId) {
                playerCounter += 1;
            }
        }

        if (playerCounter >= 3) {
            alert("Team already has three players assigned.")
            return
        }
        
        const DataForAPI = {
            firstName: inputFirstName,
            lastName: inputLastName,
            country: inputCountry,
            teamId: inputTeamId

        }
        // call Post API function on sendDataToAPI
        sendPlayerToAPI(DataForAPI)
    }
})


const sendPlayerToAPI = (playerObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playerObject)
    }

    return fetch("http://localhost:8088/players", fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}