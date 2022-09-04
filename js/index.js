let attackPlayer
let attackEnemy
let playerLives = 3
let enemyLives = 3

let sectionInicialNone = [
  document.getElementById('select-attack'),
  document.getElementById('restart'),
  document.getElementById('select-pet'),
]
sectionInicialNone[0].style.display = 'none'
sectionInicialNone[1].style.display = 'none'


const createMessage = (result) => {
  let sectionMessage = document.getElementById('messages')

  let paragraph = document.createElement('p')
  paragraph.innerHTML = `Your pet attacked with ${attackPlayer}, the enemy's pet attacked with ${attackEnemy} - ${result}`

  sectionMessage.appendChild(paragraph)
}

const createFinalMessage = (finalResult) => {
  let sectionMessage = document.getElementById('messages')

  let paragraph = document.createElement('p')
  paragraph.innerHTML = finalResult

  sectionMessage.appendChild(paragraph)

  buttonFire.disabled = true
  buttonWater.disabled = true
  buttonPlant.disabled = true

  sectionInicialNone[1].style.display = 'block'
}

const checkLives = () => {
  if (enemyLives === 0) {
    createFinalMessage(`Congratulations! You Win 😄`)
  } else if (playerLives === 0) {
    createFinalMessage(`Sorry, you lose 😔`)
  }
}

const combat = () => {
  let spanPlayerLives = document.getElementById('player-lives')
  let spanEnemyLives = document.getElementById('enemy-lives')

  switch (true) {
    case attackEnemy === attackPlayer:
      createMessage('DEAD HEAT 😑')
      break;
    case attackEnemy === 'FIRE' && attackPlayer === 'PLANT'
      || attackEnemy === 'WATER' && attackPlayer === 'FIRE'
      || attackEnemy === 'PLANT' && attackPlayer === 'WATER':
      createMessage('WIN ✅')
      enemyLives--
      spanEnemyLives.innerHTML = enemyLives
      break;
    default:
      createMessage('LOSE ❌')
      playerLives--
      spanPlayerLives.innerHTML = playerLives
      break;
  }

  checkLives()
}

const attackRandomEnemy = () => {
  let attackRandom = random(1,3)

  switch (true) {
    case attackRandom === 1:
      attackEnemy = 'FIRE'
      break;
    case attackRandom === 2:
      attackEnemy = 'WATER'
      break;
    default:
      attackEnemy = 'PLANT'
      break;
  }

  combat()
}

const attackFire = () => {
  attackPlayer = `FIRE`
  attackRandomEnemy()
}

const attackWater = () => {
  attackPlayer = `WATER`
  attackRandomEnemy()
}

const attackPlant = () => {
  attackPlayer = `PLANT`
  attackRandomEnemy()
}

let buttonFire = document.getElementById('button-fire')
  buttonFire.addEventListener('click', attackFire)
let buttonWater = document.getElementById('button-water')
  buttonWater.addEventListener('click', attackWater)
let buttonPlant = document.getElementById('button-plant')
  buttonPlant.addEventListener('click', attackPlant)

const random = (min,max) => Math.floor(Math.random() * (max - min + 1) + min)

const selectPetEnemy = () => {
  let petRandom = random(1,3)
  let spanPetEnemy = document.getElementById('pet-enemy')

  switch (true) {
    case petRandom === 1:
      spanPetEnemy.innerHTML = `Bulbasaur`
      break;
    case petRandom === 2:
      spanPetEnemy.innerHTML = `Charmander`
      break;
    default:
      spanPetEnemy.innerHTML = `Squirtle`
      break;
  }
}

const selectPetPlayer = () => {
  sectionInicialNone[2].style.display = 'none'
  sectionInicialNone[0].style.display = 'block'

  let inputBulbasaur = document.getElementById('bulbasaur')
  let inputCharmander = document.getElementById('charmander')
  let inputSquirtle = document.getElementById('squirtle')
  let spanPetPlayer = document.getElementById('pet-player')

  switch (true) {
    case inputBulbasaur.checked:
      spanPetPlayer.innerHTML = `Bulbasaur`
      break;
    case inputCharmander.checked:
      spanPetPlayer.innerHTML = `Charmander`
      break
    case inputSquirtle.checked:
      spanPetPlayer.innerHTML = `Squirtle`
      break
    default:
      alert(`Please, select your pet`)
      location.reload()
      break;
  }

  selectPetEnemy()
}

let buttonPetPlayer = document.getElementById('button-pet');
buttonPetPlayer.addEventListener('click', selectPetPlayer);

const restartGame = () => {
  location.reload();
}

let restartButton = document.getElementById('button-restart');
restartButton.addEventListener('click', restartGame)
