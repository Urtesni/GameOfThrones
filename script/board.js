// Players start at position 1 on game start.
const playerPositions = {
  1: 1,
  2: 1
}

// Tokens
const players = {
  1: null,
  2: null
}

// Player names
let player1Name = null
let player2Name = null

// Player 1 always starts
let whosTurn = 1

/**
 * Assign innitial value to player tokens.
 * Puts players on the first tile.
 * Called when the board is loaded.
 */
function initializePlayers () {
  // Gets character IDs from URL params
  const params = new URLSearchParams(window.location.search)

  player1Name = params.get('player1Name')
  const player1Image = params.get('player1Image')

  player2Name = params.get('player2Name')
  const player2Image = params.get('player2Image')

  document.getElementById('player-1-name').innerText = player1Name
  document.getElementById('player-2-name').innerText = player2Name

  // Assigns innitial value to player tokens
  players[1] = document.createElement('img')
  players[2] = document.createElement('img')

  players[1].src = player1Image
  players[2].src = player2Image

  document.getElementById('player-1-image').src = player1Image
  document.getElementById('player-2-image').src = player2Image

  // Make tokens responsive
  players[1].classList.add('img-fluid')
  players[2].classList.add('img-fluid')

  // Places tokens on first tile
  document.querySelector('#T-1 .token-holder').appendChild(players[1])
  document.querySelector('#T-1 .token-holder').appendChild(players[2])
}

initializePlayers()

function rollDice () {
  return Math.floor(Math.random() * 6) + 1
}

function nextTurn () {
  return whosTurn = whosTurn === 1 ? 2 : 1
}

let button = document.getElementById('rollDiceBtn')
button.addEventListener('click', takeTurn)

/**
 * Takes in a player ID and the number of tiles the player should move.
 * Moves the given players token to the new position.
 */
function takeTurn () {
  // Reset message from previews round
  displayMessage('')

  // Remove token from current position / tile
  document.querySelector('#T-' + playerPositions[whosTurn] + ' .token-holder').removeChild(players[whosTurn])

  // Calculate new position
  playerPositions[whosTurn] += rollDice()

  if (playerPositions[whosTurn] > 29) {
    const winnerName = whosTurn === 1 ? player1Name : player2Name
    window.open(
      '/skole/got/html/finish.html?winnerName=' + winnerName, '_self'
    )
  }
  else {
    if (playerPositions[whosTurn] === 5) {
      displayMessage('Winter is coming! Go back to start')
      playerPositions[whosTurn] = 1
    }
    else if (playerPositions[whosTurn] === 10) {
      displayMessage('Congratulations, you found a horse that will take you 2 steps further!')
      playerPositions[whosTurn] = 12
    }
    else if (playerPositions[whosTurn] === 15) {
      displayMessage('You lost in a battle. Move two steps back.')
      playerPositions[whosTurn] = 13
    }
    else if (playerPositions[whosTurn] === 20) {
      displayMessage('Nice to see that you help friends in need. You are rewarded with 4 steps.')
      playerPositions[whosTurn] = 24
    }
    else if (playerPositions[whosTurn] === 25) {
      displayMessage('So close but stil so far. Dragons attacking, take a step back.')
      playerPositions[whosTurn] = 24
    }

    // Add token to new potition / tile
    document.querySelector('#T-' + playerPositions[whosTurn] + ' .token-holder').appendChild(players[whosTurn])
  }
  nextTurn()
}

function displayMessage (message) {
  document.getElementById('message').innerHTML = '<h2>' + message + '</h2>'
}
