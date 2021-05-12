import { getPlayers, getScores, getTeams } from "../databaseAccess.js"

let scores = getScores()
let teams = getTeams()
let players = getPlayers()




export const Leaderboard = () => {
    // Grab updated copies of data
    scores = getScores()
    teams = getTeams()
    players = getPlayers()

    // Modify the new copy of the team array with updated scores and player count
    countTeamScores()
    countTeamPlayers()

    // Sorting teams by highest score
    teams.sort(function (teamA, teamB) {
        return teamB.score - teamA.score
    })

    let html = `<div class="team__columnHeader">
            <table class="table">
                <tr>
                    <th class="table__header"><u>Team</u></th>
                    <th class="table__header"><u>Players</u></th>
                    <th class="table__header"><u>Score</u></th>
                </tr>
        `

    html += teams.map((teamObject) => {
        return `
                <tr>
                    <td class="table__name">${teamObject.name}</td>
                    <td class="table__players table__value">${teamObject.playerCount}</td>
                    <td class="table__score table__value">${teamObject.score}</td>
                </tr>
        `
    }).join("")
        

    html += `</table></div>`
    return html
}






// Need to find each teams score
const countTeamScores =  () => {
    // For each score object find the team associated with scores.teamId
    scores.forEach((score) => {
        // Find index of team.id equal to score.teamId
        const teamIndex = teams.findIndex(team => team.id === score.teamId)
        

        // If current team or NEW team
        // Adding score key/value pair to teams object
        teams[teamIndex].score = !teams[teamIndex].score ?
            score.score // if we havent started counting for this team, start at the given score
            :
            teams[teamIndex].score + score.score; // otherwise add the score
    })
}



// Need to find each teams number of players
const countTeamPlayers = () => {
    // Fore each player object find the team associated with player.teamId
    players.forEach((player) => {
        // Find index of team.id equal to player.teamId
        const teamIndex = teams.findIndex(team => team.id === player.teamId)

        // If current team has players OR not
        // Adding playerCount key/value pair to teams object
        teams[teamIndex].playerCount = !teams[teamIndex].playerCount ?
            1 // if we havent started counting for this team
            :
            teams[teamIndex].playerCount + 1; // otherwise add one
    })
}

