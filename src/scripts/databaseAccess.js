const applicationState = {
    teams: [],
    players: [],
    scores: [],
    currentScores: [],
    team1CurrentScore: {},
    team2CurrentScore: {},
    team3CurrentScore: {}
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

export const setScores = (score1, score2, score3) => {
    applicationState.currentScores.push(score1)
    applicationState.currentScores.push(score2)
    applicationState.currentScores.push(score3)
}

export const postScores = (scoreObject) => {
    const fetchScores = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreObject)
    }
    return fetch("http://localhost:8088/scores", fetchScores)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
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
}

export const setTeam2id = (id) => {
    applicationState.team2CurrentScore.teamId = id
}

export const setTeam3id = (id) => {
    applicationState.team3CurrentScore.teamId = id
}
