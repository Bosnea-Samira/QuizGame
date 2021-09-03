const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
            question: "What is the capital of Luxembourg?",
            choice1: "Paris",
            choice2: "Luxembourg",
            choice3: "Monaco",
            choice4: "Liechtenstein",
            answer: 2,
    },
    {
            question: "What is a tomato?",
            choice1: "fruit",
            choice2: "animal",
            choice3: "city",
            choice4: "vegetable",
            answer: 1,
          },
        
          {
            question: "How many planets are in the Solar System",
            choice1: "7",
            choice2: "8",
            choice3: "9",
            choice4: "1",
            answer: 2,
          },
          {
            question: "Africa is a...",
            choice1: "planet",
            choice2: "country",
            choice3: "continent",
            choice4: "state",
            answer: 3,
          },
     
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("end.html")
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText  =  currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        }, 1000)
    })
})
 incrementScore = num => {
     score +=num
     scoreText.innerText = score
 }
 startGame()