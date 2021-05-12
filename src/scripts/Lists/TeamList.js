import { getTeam1CurrentScore, getTeam2CurrentScore, getTeam3CurrentScore, getTeams, setTeam1id, setTeam2id, setTeam3id } from "../databaseAccess.js"
import { scoreProvider } from "../Providers/ScoreProvider.js"
import { newTeamForm } from "../Providers/TeamProvider.js";
import { newPlayerForm } from "../Providers/PlayerProvider.js";

// function to create team list items for team dropdown menu
export const teamOptionList = () => {
    const teamsArray = getTeams()
    return `
        <option>--choose one!--</option>
        ${ teamsArray.map(teamListItem).join("\n") }
        </select>
    `
}

const teamListItem = (team) => {
    return `<option value="${team.id}">${team.name}</option>`
}


export const selectGameplayTeams = () => {
    return `
    <div class="gameplay__team___dropdowns">
    <div class="gameplay__team__dropdown">
    <select name="teamSelection1" class="dropdownList">
            <option class="teamSelectOption" value="">--choose one!--</option>
            ${teamOptionList()}
        </select>
    </div>
    <div class="gameplay__team__dropdown">
    <select name="teamSelection2" class="dropdownList">
            <option class="teamSelectOption" value="">--choose one!--</option>
            ${teamOptionList()}
        </select>
        </div>
        <div class="gameplay__team__dropdown">
    <select name="teamSelection3" class="dropdownList">
            <option class="teamSelectOption" value="">--choose one!--</option>
            ${teamOptionList()}
        </select>
        </div>
    </div>`
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("change", changeEvent => {
    if (changeEvent.target.name === "teamSelection1") {
        setTeam1id(parseInt(changeEvent.target.value))
    } else if (changeEvent.target.name === "teamSelection2") {
        setTeam2id(parseInt(changeEvent.target.value))
    } else if (changeEvent.target.name === "teamSelection3") {
        setTeam3id(parseInt(changeEvent.target.value))
    }
})

mainContainer.addEventListener("change", changeEvent => {
    const team1CurrentScore = getTeam1CurrentScore()
    const team2CurrentScore = getTeam2CurrentScore()
    const team3CurrentScore = getTeam3CurrentScore()
    if (team1CurrentScore.teamId > 0 &&
        team2CurrentScore.teamId > 0 &&
        team3CurrentScore.teamId > 0) {
        mainContainer.innerHTML = `
        <h1>Truncheons and Flagons</h1>
    <div class="truncheons__container">
    <article class="choices">
        <section class="new__player">
            <h2>New Player</h2>
            ${newPlayerForm()}
        </section>
        <section class="new__team">
            <h2>New Team</h2>
            ${newTeamForm()}
        </section>
        </article>
        
        <section class="game__play">
        ${scoreProvider()}
        </section>

        <section class="new__leaderboard">
            <h2>Leaderboard</h2>
        </section>
    </div>`
    } 
})
