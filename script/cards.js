// Player objects
let player1 = {
  name: null,
  image: null
}

let player2 = {
  name: null,
  image: null
}

async function get10Characters () {
  const res = await fetch('https://raw.githubusercontent.com/joakimskoog/AnApiOfIceAndFire/master/data/characters.json')
  const allCharacters = await res.json()

  const charactersWithName = allCharacters.filter(c => {
    return c.Name
  })

  const tenCharacters = charactersWithName.splice(0, 10)

  const cardTitles = document.querySelectorAll('.card-title')
  const genders = document.querySelectorAll('.gender')
  const buttons = document.querySelectorAll('.btn-dark')
  const images = document.querySelectorAll('.card-img-top')

  tenCharacters.forEach((character, index) => {
    cardTitles[index].innerText = character.Name
    genders[index].innerText = character.IsFemale ? 'Female' : 'Male'

    buttons[index].addEventListener('click', () => {
      // Set player1 name and image
      if (!player1.name) {
        player1.name = character.Name
        player1.image = images[index].src

        document.getElementById('player-1-name').innerText = player1.name
        document.getElementById('player-1-image').src = player1.image
      }
      // Set player2 name and image
      else if (!player2.name) {
        player2.name = character.Name
        player2.image = images[index].src

        document.getElementById('player-2-name').innerText = player2.name
        document.getElementById('player-2-image').src = player2.image

        // Set timeout to make it more intiutive to understand that player 2 was
        // successfully selected.
        setTimeout(() => {
          window.open(
            '/skole/got/html/board.html?player1Name=' + player1.name +
            '&player1Image=' + player1.image + '&player2Name=' + player2.name +
            '&player2Image=' + player2.image, '_self')
        }, 1500)
      }
    })
  })
}

get10Characters()
