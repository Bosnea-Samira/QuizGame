const highScoresList = document.querySelector("#highScoresList");
const highScores = JSON(localStorage.getItem(highScores)) || []

highScoresList.innerHTML = 
highScores.map(score =>{
    return`<li class= "highs-score"> ${score.name} - ${score.score}</li>`

}).join("")