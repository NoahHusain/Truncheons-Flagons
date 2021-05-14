import { addToTeamDropdown } from "../Lists/TeamList.js"
import { getPlayers } from "../databaseAccess.js"
import { MessageBox } from "../MessageBox.js"

// render function for new player form
export const newPlayerForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="firstName">First Name</label>
        <input type="text" name="firstName" class="input inputFirstName"/>
    </div>

    <div class="field">
        <label class="label" for="lastName">Last Name</label>
        <input type="text" name="lastName" class="input inputLastName"/>
    </div>

    <div class="field">
        <label class="label" for="countryOfOrigin">Country of Origin</label>
        <input type="text" name="countryOfOrigin" class="input inputCountry"/>
    </div>

    <div class="field">
        <label class="label" for="teamSelection">Select a team:</label>
        <select id="teamSelection" class="dropdownList">
            ${addToTeamDropdown()}
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
   
        //reset field background color to white
        const firstNameField = document.querySelector(".inputFirstName")
        firstNameField.style.background = "white"
        const lastNameField = document.querySelector(".inputLastName")
        lastNameField.style.background = "white"
        const countryField = document.querySelector(".inputCountry")
        countryField.style.background = "white"
        
        // grab user input
        let inputFirstName = document.querySelector("input[name='firstName']").value
        let inputLastName = document.querySelector("input[name='lastName']").value
        let inputCountry = document.querySelector("input[name='countryOfOrigin']").value
        const inputTeamId = parseInt(document.querySelector("#teamSelection").value)

        //check to see if individual fields are empty// each empty field is set to red
        if (inputFirstName === "") {firstNameField.style.background = "#fc7878"}
        if (inputLastName === "") {lastNameField.style.background = "#fc7878"}
        if (inputCountry === "") {countryField.style.background = "#fc7878"}
        
        //check to see if a team is chosen, if not, message box appears and event listener returns before sending data to API
        if (inputTeamId === 0) {
            MessageBox("Please select a team")
            return
        }

        //checks to see if any fields are empty, if so, event listener returns before sending data to API
        if (inputFirstName === "" || inputLastName === "" || inputCountry === "") {return}


        // check whether team already has three players
        // disabled now (commented out) because of new dropdown list implementation
        // populated teams no longer display in team select option when adding new player
        // const playersArray = getPlayers()
        // let playerCounter = 0

        // for (let i = 0; i < playersArray.length; i++) {
        //     if (playersArray[i].teamId === inputTeamId) {
        //         playerCounter += 1;
        //     }
        // }

        // if (playerCounter >= 3) {
        //     alert("Team already has three players assigned.")
        //     return
        // }

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