function initializeWinner () {
  // Get winner from URL params
  const params = new URLSearchParams(window.location.search)
  const winnerName = params.get('winnerName')

  document.getElementById('winner-text').innerText = 'The winner is ' + winnerName + '!'
}

initializeWinner()
