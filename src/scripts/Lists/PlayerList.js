// TODO: import, invoke function TeamOptionList() with HTML string for option on line 27;
// cut and paste 27 over to TeamOptionList() function

import { fetchTeams } from "./dataAccess.js"
 
// render function for new player form
export const newPlayerForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="firstName">Fist Name</label>
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
        <select name="teamSelection" class="dropdownList">
            <option class="teamSelectOption" value="">--choose one!--</option>
            ${teamOptionList()}
        </select>
    </div>
 
 
    <button class="button" id="submitPlayer">Draft to Team</button> 
    `
    return html
}


// function to create team list items for team dropdown menu
const teamsArray = fetchTeams()
const teamOptionList = () => {
    return `
        ${ teamsArray.map(teamListItem).join("\n") }
    `
}

const teamListItem = (team) => {
    return `<option class="teamSelectOption" value="${team.id}">${team.name}</option>
}