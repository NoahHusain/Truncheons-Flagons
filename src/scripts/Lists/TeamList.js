import { getPlayers, getTeam1CurrentScore, getTeam2CurrentScore, getTeam3CurrentScore, getTeams, setTeam1id, setTeam2id, setTeam3id } from "../databaseAccess.js"
import { MessageBox } from "../MessageBox.js";
import { printCurrentRound, scoreProvider } from "../Providers/ScoreProvider.js"
import { currentGame } from "../Stats/Score.js";

// function to create team list items for team dropdown menu
export const teamOptionList = () => {
    const teamsArray = getTeams()
    return `
        <option>--choose one!--</option>
        ${teamsArray.map(teamListItem).join("\n")}
        </select>
    `
}

const teamListItem = (team) => {

    const playersArray = getPlayers()
    let teamPlayerCounter = 0

    for (let i = 0; i < playersArray.length; i++) {
        if (playersArray[i].teamId === team.id) {
            teamPlayerCounter += 1
        }
    }

    if (teamPlayerCounter >= 3) {
        return `<option value="${team.id}">${team.name}</option>`
    }
}

// list to add new player to unpopulated team
export const addToTeamDropdown = () => {
    const teamsArray = getTeams()
    return `
        <option>--choose one!--</option>
        ${teamsArray.map(newTeamListItem).join("\n")}
        </select>
    `
}

const newTeamListItem = (team) => {
    const playersArray = getPlayers()
    let teamPlayerCounter = 0

    for (let i = 0; i < playersArray.length; i++) {
        if (playersArray[i].teamId === team.id) {
            teamPlayerCounter += 1
        }
    }

    if (teamPlayerCounter < 3) {
        return `<option value="${team.id}">${team.name}</option>`
    }
}


export const selectGameplayTeams = () => {
    return `
    <h2>Select your teams!</h2>
    <div class="gameplay__team___dropdowns">
    <div class="gameplay__team__dropdown">
    <select name="teamSelection1" class="dropdownList teamSelect" id="teamSelection1">
            ${teamOptionList()}
        </select>
    </div>
    <div class="gameplay__team__dropdown">
    <select name="teamSelection2" class="dropdownList teamSelect" id="teamSelction2">
            ${teamOptionList()}
        </select>
        </div>
        <div class="gameplay__team__dropdown">
    <select name="teamSelection3" class="dropdownList teamSelect" id="teamSelection3">
            ${teamOptionList()}
        </select>
        </div>
    </div>`
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("change", changeEvent => {
    if (changeEvent.target.name === "teamSelection1") {
        setTeam1id(parseInt(changeEvent.target.value))
        const team1CurrentScore = getTeam1CurrentScore()
        const team2CurrentScore = getTeam2CurrentScore()
        const team3CurrentScore = getTeam3CurrentScore()
        if (team1CurrentScore.teamId > 0 &&
            team2CurrentScore.teamId > 0 &&
            team3CurrentScore.teamId > 0 &&
            team1CurrentScore.teamId != team2CurrentScore.teamId &&
            team1CurrentScore.teamId != team3CurrentScore.teamId &&
            team2CurrentScore.teamId != team3CurrentScore.teamId) {
            const gamePlay = document.querySelector(".game__play")
            gamePlay.innerHTML = `
                ${scoreProvider()}
                ${printCurrentRound()}
                ${currentGame()}`
        }
    }
})

mainContainer.addEventListener("change", changeEvent => {
    if (changeEvent.target.name === "teamSelection2") {
        setTeam2id(parseInt(changeEvent.target.value))
        const team1CurrentScore = getTeam1CurrentScore()
        const team2CurrentScore = getTeam2CurrentScore()
        const team3CurrentScore = getTeam3CurrentScore()
        if (team1CurrentScore.teamId > 0 &&
            team2CurrentScore.teamId > 0 &&
            team3CurrentScore.teamId > 0 &&
            team2CurrentScore.teamId != team1CurrentScore.teamId &&
            team2CurrentScore.teamId != team3CurrentScore.teamId &&
            team1CurrentScore.teamId != team3CurrentScore.teamId) {
            const gamePlay = document.querySelector(".game__play")
            gamePlay.innerHTML = `
                ${scoreProvider()}
                ${printCurrentRound()}
                ${currentGame()}`
        }
    }
})

mainContainer.addEventListener("change", changeEvent => {
    if (changeEvent.target.name === "teamSelection3") {
        setTeam3id(parseInt(changeEvent.target.value))
        const team1CurrentScore = getTeam1CurrentScore()
        const team2CurrentScore = getTeam2CurrentScore()
        const team3CurrentScore = getTeam3CurrentScore()
        if (team1CurrentScore.teamId > 0 &&
            team2CurrentScore.teamId > 0 &&
            team3CurrentScore.teamId > 0 &&
            team3CurrentScore.teamId != team1CurrentScore.teamId &&
            team3CurrentScore.teamId != team2CurrentScore.teamId &&
            team1CurrentScore.teamId != team2CurrentScore.teamId) {
            const gamePlay = document.querySelector(".game__play")
            gamePlay.innerHTML = `
                ${scoreProvider()}
                ${printCurrentRound()}
                ${currentGame()}`
        } else {
            MessageBox("The same team was selected more than once. Please select different teams.")
        }
    }
}
)
