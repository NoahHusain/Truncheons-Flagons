import { getTeams } from "../databaseAccess.js"

// function to create team list items for team dropdown menu
export const teamOptionList = () => {
    const teamsArray = getTeams()
    return `
        ${ teamsArray.map(teamListItem).join("\n") }
    `
}

const teamListItem = (team) => {
    return `<option class="teamSelectOption" value="${team.id}">${team.name}</option>`
}