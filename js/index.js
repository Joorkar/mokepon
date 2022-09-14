const inputBulbasaur = document.getElementById('bulbasaur')
const inputCharmander = document.getElementById('charmander')
const inputSquirtle = document.getElementById('squirtle')

const spanPetPlayer = document.getElementById('pet-player')
const spanPetEnemy = document.getElementById('pet-enemy')
const spanPlayerlifes = document.getElementById('player-lifes')
const spanEnemylifes = document.getElementById('enemy-lifes')

const resultMessage = document.getElementById('result')

const playerAttacksMessage = document.getElementById('player-attacks')
const enemyAttacksMessage = document.getElementById('enemy-attacks')

const buttonFire = document.getElementById('button-fire')
const buttonWater = document.getElementById('button-water')
const buttonPlant = document.getElementById('button-plant')

const buttonPetPlayer = document.getElementById('button-pet');
const restartButton = document.getElementById('button-restart');

let pokemones = []
let attackPlayer
let attackEnemy
let playerlifes = 3
let enemylifes = 3

class Pokemon {
  constructor(name, photo, life) {
    this.name = name
    this.photo = photo
    this.life = life
    this.attacks = []
  }
}

let bulbasaur = new Pokemon('Bulbasaur', './assets/Bulbasaur.png', 5)
let charmander = new Pokemon('Charmander', './assets/Charmander.png', 5)
let squirtle = new Pokemon('Squirtle', './assets/Squirtle.png', 5)

bulbasaur.attacks.push(
  { name: '💧', id: 'button-water' },
  { name: '💧', id: 'button-water' },
  { name: '💧', id: 'button-water' },
  { name: '🔥', id: 'button-fire' },
  { name: '🌱', id: 'button-plant' },
)

charmander.attacks.push(
  { name: '🔥', id: 'button-fire' },
  { name: '🔥', id: 'button-fire' },
  { name: '🔥', id: 'button-fire' },
  { name: '💧', id: 'button-water' },
  { name: '🌱', id: 'button-plant' },
)

squirtle.attacks.push(
  { name: '🌱', id: 'button-plant' },
  { name: '🌱', id: 'button-plant' },
  { name: '🌱', id: 'button-plant' },
  { name: '🔥', id: 'button-fire' },
  { name: '💧', id: 'button-water' },
)

const sectionInicialNone = [
  document.getElementById('select-attack'),
  document.getElementById('restart'),
  document.getElementById('select-pet'),
]
sectionInicialNone[0].style.display = 'none'
sectionInicialNone[1].style.display = 'none'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const createMessage = (result) => {
  let newPlayerAttack = document.createElement('p')
  let newEnemyAttack = document.createElement('p')

  resultMessage.innerHTML = result
  newPlayerAttack.innerHTML = attackPlayer
  newEnemyAttack.innerHTML = attackEnemy

  playerAttacksMessage.appendChild(newPlayerAttack)
  enemyAttacksMessage.appendChild(newEnemyAttack)
}

const createFinalMessage = (finalResult) => {
  resultMessage.innerHTML = finalResult

  buttonFire.disabled = true
  buttonWater.disabled = true
  buttonPlant.disabled = true

  sectionInicialNone[1].style.display = 'block'
}

const checklifes = () => {
  if (enemylifes === 0) {
    createFinalMessage(`Congratulations! You Win 😄`)
  } else if (playerlifes === 0) {
    createFinalMessage(`Sorry, you lose 😔`)
  }
}

const combat = () => {
  switch (true) {
    case attackEnemy === attackPlayer:
      createMessage('DEAD HEAT 😑')
      break;
    case attackEnemy === 'FIRE' && attackPlayer === 'PLANT'
      || attackEnemy === 'WATER' && attackPlayer === 'FIRE'
      || attackEnemy === 'PLANT' && attackPlayer === 'WATER':
      createMessage('WIN ✅')
      enemylifes--
      spanEnemylifes.innerHTML = enemylifes
      break;
    default:
      createMessage('LOSE ❌')
      playerlifes--
      spanPlayerlifes.innerHTML = playerlifes
      break;
  }

  checklifes()
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

buttonFire.addEventListener('click', attackFire)
buttonWater.addEventListener('click', attackWater)
buttonPlant.addEventListener('click', attackPlant)

const selectPetEnemy = () => {
  let petRandom = random(1, 3)

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
  sectionInicialNone[0].style.display = 'flex'

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

buttonPetPlayer.addEventListener('click', selectPetPlayer);

const restartGame = () => {
  location.reload();
}

restartButton.addEventListener('click', restartGame)