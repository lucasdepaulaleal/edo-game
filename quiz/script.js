const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next-question");
const $titleContainer = document.querySelector(".title-container");
const $titleText = document.querySelector(".title h1");

const backgrounds = [
  "../assets/3.png",
  "../assets/4.png",
  "../assets/5.png",
  "../assets/6.png",
  "../assets/7.png",
  "../assets/8.png",
  "../assets/9.png",
  "../assets/10.png",
  "../assets/1.png",
];

const titles = [
  "Básico",
  "Resfriamento de Newton",
  "Resfriamento de Newton",
  "Crescimento Populacional",
  "Crescimento Populacional",
  "Decaimento Radioativo",
  "Decaimento Radioativo",
  "Mista",
];

let totalCorrect = 0;
let currentQuestionIndex = 0;

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  $titleContainer.classList.remove("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();
  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }
  $questionText.textContent = questions[currentQuestionIndex].question;
  $titleText.textContent = titles[Math.floor(currentQuestionIndex / 1)];
  fadeBackgroundChange(backgrounds[currentQuestionIndex]);
  questions[currentQuestionIndex].answers.forEach((answer) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);
    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }
  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;
  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answer").forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });
  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame() {
  const totalQuestion = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestion);
  let message = "";
  switch (true) {
    case performance >= 90:
      message = "Excelente :)";
      break;
    case performance >= 70:
      message = "Muito bom :)";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }
  $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!
            <span>Resultado: ${message}</span>
        </p>
            <button onclick="restartGame()" class="button">
            Restart
            </button>
    `;
  $titleContainer.classList.add("hide");
}

function fadeBackgroundChange(newBackground) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    document.body.style.backgroundImage = `url(${newBackground})`;
    document.body.classList.remove("fade-out");
  }, 100);
}

function restartGame() {
  questions.sort(() => Math.random() - 0.5);
  window.location.reload();
}

const questions = [
  {
    question: "O que é uma EDO?",
    answers: [
      { text: "Eterna Disciplina Oculta", correct: false },
      { text: "Especialista em Dar Opinião", correct: false },
      { text: "Equação Diferencial Ordinária", correct: true },
      { text: "Eternamente Desorganizado e Ocupado", correct: false },
    ],
  },
  {
    question:
      "Um café é servido a 85°C em um ambiente onde a temperatura é constante de 20°C. Se a constante de resfriamento é k = 0.1min^-1, qual será a temperatura do café após 10 minutos?",
    answers: [
      { text: "60°C", correct: false },
      { text: "30°C", correct: true },
      { text: "45°C", correct: false },
      { text: "25°C", correct: false },
    ],
  },
  {
    question:
      "Uma xícara de chá é servida a 90°C em um ambiente onde a temperatura é constante de 15°C. Se a constante de resfriamento é k=0.05ˆ-1, quanto tempo levará para que a temperatura do chá atinja 30°C?",
    answers: [
      { text: "12 minutos", correct: false },
      { text: "18 minutos", correct: false },
      { text: "15 minutos", correct: true },
      { text: "20 minutos", correct: false },
    ],
  },
  {
    question:
      "Uma população inicial de 1000 indivíduos cresce a uma taxa de 5% ao ano. Qual será a população após 10 anos?",
    answers: [
      { text: "1648", correct: true },
      { text: "1629", correct: false },
      { text: "1500", correct: false },
      { text: "1250", correct: false },
    ],
  },
  {
    question:
      "Uma colônia de bactérias cresce de acordo com a equação dP/dt=0.05P(1000−P), onde P(t) representa a população no tempo t. Se inicialmente há 500 bactérias, quanto tempo levará para que a população atinja 800 bactérias?",
    answers: [
      { text: "10 horas", correct: false },
      { text: "12 horas", correct: false },
      { text: "15 horas", correct: true },
      { text: "18 horas", correct: false },
    ],
  },
  {
    question:
      "A meia-vida de um certo isótopo radioativo é de 5 anos. Se inicialmente há 200g do isótopo, quanto restará após 10 anos?",
    answers: [
      { text: "100g", correct: false },
      { text: "75g", correct: false },
      { text: "50g", correct: true },
      { text: "25g", correct: false },
    ],
  },
  {
    question:
      "Um material radioativo decai com uma meia-vida de 30 anos. Se inicialmente há 800g do material, quanto tempo levará para que reste 100g?",
    answers: [
      { text: "60 anos", correct: false },
      { text: "90 anos", correct: true },
      { text: "120 anos", correct: false },
      { text: "150 anos", correct: false },
    ],
  },
  {
    question:
      "Qual dos seguintes fenômenos pode ser descrito pela equação diferencial dy/dt = ky ?",
    answers: [
      { text: "Resfriamento de um objeto", correct: false },
      { text: "Crescimento populacional", correct: false },
      { text: "Decaimento radioativo", correct: false },
      { text: "Todas as anteriores", correct: true },
    ],
  },
];
