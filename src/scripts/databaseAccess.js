const applicationState = {
    teams: [],
    players: [],
    scores: [],
    currentScores: [],
    team1CurrentScore: {},
    team2CurrentScore: {},
    team3CurrentScore: {},
    CurrentRound: 0 
}



// API fetch functions
export const fetchTeams = () => {
    return fetch("http://localhost:8088/teams")
        .then(response => response.json())
        .then(data => {
            applicationState.teams = data
        })
}


export const fetchPlayers = () => {
    return fetch("http://localhost:8088/players")
        .then(response => response.json())
        .then(data => {
            applicationState.players = data
        })
}


export const fetchScores = () => {
    return fetch("http://localhost:8088/scores")
        .then(response => response.json())
        .then(data => {
            applicationState.scores = data
        })
}



// Exported Get Functions 
export const getTeams = () => {
    return [...applicationState.teams]
}
export const getPlayers = () => {
    return [...applicationState.players]
}
export const getScores = () => {
    return [...applicationState.scores]
}
export const getCurrentRound = () => {
    return applicationState.CurrentRound
}

export const setCurrentRound = (round) => {
    applicationState.CurrentRound = round
}

export const setScores = (score1, score2, score3) => {
    applicationState.currentScores.push(score1)
    applicationState.currentScores.push(score2)
    applicationState.currentScores.push(score3)
}

export const postScores = () => {
    const newScoreCreated = {
        teamId: applicationState.teams,
        score: applicationState.scores
    }

    return fetch("http://localhost:8088/scores", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScoreCreated)
    })
        .then(res => res.json())
        .then()
}

export const getTeam1CurrentScore = () => {
    return {...applicationState.team1CurrentScore}
}
export const getTeam2CurrentScore = () => {
    return {...applicationState.team2CurrentScore}
}
export const getTeam3CurrentScore = () => {
    return {...applicationState.team3CurrentScore}
}

export const setTeam1id = (id) => {
    applicationState.team1CurrentScore.teamId = id
    applicationState.team1CurrentScore.score = 0
}

export const setTeam2id = (id) => {
    applicationState.team2CurrentScore.teamId = id
    applicationState.team2CurrentScore.score = 0
}

export const setTeam3id = (id) => {
    applicationState.team3CurrentScore.teamId = id
    applicationState.team3CurrentScore.score = 0
    console.log(applicationState.team3CurrentScore.teamId)
}

export const setTeam1score = (score) => {
    applicationState.team1CurrentScore.score += score
}
export const setTeam2score = (score) => {
    applicationState.team2CurrentScore.score += score
}
export const setTeam3score = (score) => {
    applicationState.team3CurrentScore.score += score
}
