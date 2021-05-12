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

    let html = `<div class="team__columnHeader team__name">`

    html += teams.map((teamObject) => {
        return `
                <ul>
                    <li>${teamObject.name}</li>
                </ul>
                <ul>
                    <li>${teamObject.playerCount}</li>
                </ul>
                <ul>
                    <li>${teamObject.score}</li>
                </ul>
        `
    }).join("")
        

    html += `</div>`
    return html
}








// // Need to find each teams score
// const countTeamScores =  () => {
//     // For each score object find the team associated with scores.teamId
//     scores.forEach((score) => {
//         // Find index of team.id equal to score.teamId
//         const teamIndex = teams.findIndex(team => team.id === score.teamId)

//         // If current team or NEW team
//         // Adding score key/value pair to teams object
//         if(teams[teamIndex].score === teams[teamIndex].score) {
//             teams[teamIndex].score + score.score // Add the score to current team
//         } else {
//             score.score// Else NEW team start counting at given score (probably 0) 
//         }
//     })
// }


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

// // Need to find each teams number of players
// const countTeamPlayers = () => {
//     // Fore each player object find the team associated with player.teamId
//     players.forEach((player) => {
//         // Find index of team.id equal to player.teamId
//         const teamIndex = teams.findIndex(team => team.id === player.teamId)

//         // If current team has players OR not
//         // Adding playerCount key/value pair to teams object
//         if (teams[teamIndex].playerCount = !teams[teamIndex].playerCount) {
//             console.log(teams[teamIndex].playerCount += 1) // If existing team add 1
//         } else {
//             console.log(teams[teamIndex].playerCount + 1)// Else add 1 player to NEW team
//         }
//     })
// }


// Need to find each teams number of players
const countTeamPlayers = () => {
    // Fore each player object find the team associated with player.teamId
    players.forEach((player) => {
        // Find index of team.id equal to player.teamId
        const teamIndex = teams.findIndex(team => team.id === player.teamId)

        // If current team has players OR not
        // Adding playerCount key/value pair to teams object
        teams[teamIndex].playerCount = !teams[teamIndex].playerCount ?
            1 // if we havent started counting for this team, start at one
            :
            teams[teamIndex].playerCount + 1; // otherwise add one
    })
}

