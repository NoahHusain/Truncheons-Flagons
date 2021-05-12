
export const TeamList = () => {
    return "Team List"
}

import { getTeams } from "../databaseAccess.js"

// function to create team list items for team dropdown menu
export const teamOptionList = () => {
    const teamsArray = getTeams()
    return `
        <select id="teamSelection" class="dropdownList">
        <option>--choose one!--</option>
        ${ teamsArray.map(teamListItem).join("\n") }
        </select>
    `
}

const teamListItem = (team) => {
    return `<option value="${team.id}">${team.name}</option>`
}