// render function for new team form
import { getTeams } from "../databaseAccess.js"

const teams = getTeams()

// could you grab team names like this? ${getTeams.teams[0]}
export const scoreProvider = () => {
    let html = `
    <div class="field">
        <label class="label" for="teamScore">Team 1 Score:</label>
        <input type="text" name="teamScore" class="input"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">Team 2 Score:</label>
        <input type="text" name="teamScore" class="input"/>
    </div>

    <div class="field">
        <label class="label" for="teamScore">Team 3 Score:</label>
        <input type="text" name="teamScore" class="input"/>
    </div>
 
    <button class="button" id="submitTeam">Submit Score</button> 
    `
    return html
}

// sendDataToAPI