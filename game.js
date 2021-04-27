function initGame () {
  let userInput = document.querySelector('.userInput')
  let submitButton = document.querySelector('.submitButton')
  let guessForm = document.querySelector('.guessForm')
  let message = document.querySelector('.message')
  let lowGuess = document.querySelector('.lowGuess')
  let highGuess = document.querySelector('.highGuess')
  let startAgainButton = document.querySelector('.startAgainButton')
  let winNumber = document.querySelector('.winNumber')
  let alert = document.querySelector('.alert')

  let guessCounter = 0
  let lowGuessNumber = 0
  let highGuessNumber = 100
  let randomNumber = getRandomNumber(1, 99)
  console.log('random number:', randomNumber)

  function updateMessage (content, color) {
    message.innerHTML = content
    alert.style.backgroundColor = color
  }

  function compareGuessedNumber (guessedNumber) {

    if ((guessedNumber >= highGuessNumber) || (guessedNumber <= lowGuessNumber)) {
      updateMessage('This is obviously wrong', 'gray')
    } else {
      guessCounter = guessCounter + 1
      console.log('guess', guessCounter)

      if (randomNumber < guessedNumber) {
        if (highGuessNumber > guessedNumber) {
          highGuessNumber = guessedNumber
          highGuess.innerHTML = highGuessNumber
        }
        updateMessage('Too high', 'red')
      } else if (randomNumber > guessedNumber) {
        if (lowGuessNumber < guessedNumber) {
          lowGuessNumber = guessedNumber
          lowGuess.innerHTML = lowGuessNumber
        }
        updateMessage('Too low', 'blue')
      } else if (randomNumber === guessedNumber) {
        winNumber.innerHTML = randomNumber
        updateMessage('you win!!! you guess ' + guessCounter + ' times', 'gold')
      } else {
        message.innerHTML = 'invalid input'
      }
    }

    userInput.value = ''
    userInput.focus()
  }

  function handleUserInput (event) {
    event.preventDefault()
    let userGuess = Number(userInput.value)
    compareGuessedNumber(userGuess)
  }

  function restartGame () {
    // document.location.reload()

    message.innerHTML = 'Guess!'
    highGuess.innerHTML = '100'
    lowGuess.innerHTML = '0'
    winNumber.innerHTML = '?'

    alert.style.backgroundColor = '#ec028c'

    submitButton.removeEventListener('click', handleUserInput)
    startAgainButton.removeEventListener('click', restartGame)
    guessForm.removeEventListener('submit', handleUserInput)

    initGame()
  }

  submitButton.addEventListener('click', handleUserInput)
  startAgainButton.addEventListener('click', restartGame)
  guessForm.addEventListener('submit', handleUserInput)
}

function getRandomNumber (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

window.addEventListener('load', initGame)
