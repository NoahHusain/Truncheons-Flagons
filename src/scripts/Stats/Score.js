import { getTeam1CurrentScore, getTeam2CurrentScore, getTeam3CurrentScore, getTeams } from "../databaseAccess.js"

export const currentGame = () => {
    const allTeams = getTeams()
    const team1current = getTeam1CurrentScore()
    const foundTeam1 = allTeams.find(team => team.id === team1current.teamId)
    const team2current = getTeam2CurrentScore()
    const foundTeam2 = allTeams.find(team => team.id === team2current.teamId)
    const team3current = getTeam3CurrentScore()
    const foundTeam3 = allTeams.find(team => team.id === team3current.teamId)
    return `
    <section class="currentGame">
    <h3>Current Game</h3>
    <div class="teamscore__item" class="team1score__item">
    <div class="team1">${foundTeam1.name}</div>
    <div class="team1score">${team1current.score} </div>
    </div>
    <div class="teamscore__item" class="team2score__item">
    <div class="team2">${foundTeam2.name}</div>
    <div class="team2score">${team2current.score} </div>
    </div>
    <div class="teamscore__item" class="team1score__item">
    <div class="team1">${foundTeam3.name}</div>
    <div class="team1score">${foundTeam3.score} </div>
    </div>
    </section>`
}