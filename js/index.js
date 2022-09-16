const spanPetPlayer = document.getElementById('pet-player')
const spanPetEnemy = document.getElementById('pet-enemy')
const spanPlayerlifes = document.getElementById('player-lifes')
const spanEnemylifes = document.getElementById('enemy-lifes')

const cardsContainer = document.getElementById('cards-container')
const resultMessage = document.getElementById('result')

const playerAttacksMessage = document.getElementById('player-attacks')
const enemyAttacksMessage = document.getElementById('enemy-attacks')

const buttonPetPlayer = document.getElementById('button-pet');
const restartButton = document.getElementById('button-restart');
const containerAttacks = document.getElementById('container-attacks');

let pokemons = []
let attackPlayer
let attackEnemy
let pokemonsOptions
let inputBulbasaur
let inputCharmander
let inputSquirtle
let petPlayer
let pokemonsAttacks
let buttonFire = document.getElementById('button-fire')
let buttonWater = document.getElementById('button-water')
let buttonPlant = document.getElementById('button-plant')
let playerlifes = 3
let enemylifes = 3

const sectionInicialNone = [
  document.getElementById('select-attack'),
  document.getElementById('restart'),
  document.getElementById('select-pet'),
]
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
  { name: 'Water 💧', id: 'button-water' },
  { name: 'Water 💧', id: 'button-water' },
  { name: 'Water 💧', id: 'button-water' },
  { name: 'Fire 🔥', id: 'button-fire' },
  { name: 'Plant 🌱', id: 'button-plant' },
)

charmander.attacks.push(
  { name: 'Fire 🔥', id: 'button-fire' },
  { name: 'Fire 🔥', id: 'button-fire' },
  { name: 'Fire 🔥', id: 'button-fire' },
  { name: 'Water 💧', id: 'button-water' },
  { name: 'Plant 🌱', id: 'button-plant' },
)

squirtle.attacks.push(
  { name: 'Plant 🌱', id: 'button-plant' },
  { name: 'Plant 🌱', id: 'button-plant' },
  { name: 'Plant 🌱', id: 'button-plant' },
  { name: 'Fire 🔥', id: 'button-fire' },
  { name: 'Water 💧', id: 'button-water' },
)

pokemons.push(bulbasaur, charmander, squirtle)

sectionInicialNone[0].style.display = 'none'
sectionInicialNone[1].style.display = 'none'

pokemons.forEach((pokemon) => {
  pokemonsOptions = `
    <input type="radio" name="pet" id=${pokemon.name} value=${pokemon.name}>
    <label class="pokemon-card" for=${pokemon.name}>
      <p>${pokemon.name}</p>
      <img src=${pokemon.photo} alt=${pokemon.name} />
    </label>
  `

  cardsContainer.innerHTML += pokemonsOptions

  inputBulbasaur = document.getElementById('Bulbasaur')
  inputCharmander = document.getElementById('Charmander')
  inputSquirtle = document.getElementById('Squirtle')
})

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

const selectPetEnemy = () => {
  let petRandom = random(0, pokemons.length - 1)

  spanPetEnemy.innerHTML = pokemons[petRandom].name
}

const showAttacks = (attacks) => {
  attacks.forEach((attack) => {
    pokemonsAttacks = `
    <button id=${attack.id} class="button-attack">${attack.name}</button>
    `

    containerAttacks.innerHTML += pokemonsAttacks
  })

  buttonFire = document.getElementById('button-fire')
  buttonWater = document.getElementById('button-water')
  buttonPlant = document.getElementById('button-plant')

  buttonFire.addEventListener('click', attackFire)
  buttonWater.addEventListener('click', attackWater)
  buttonPlant.addEventListener('click', attackPlant)
}

const pullAttacks = (petPlayer) => {
  let attacks

  pokemons.forEach((pokemon) => {
    if (petPlayer === pokemon.name) {
      attacks = pokemon.attacks
    }
  })

  showAttacks(attacks)
}

const selectPetPlayer = () => {
  sectionInicialNone[2].style.display = 'none'
  sectionInicialNone[0].style.display = 'flex'

  switch (true) {
    case inputBulbasaur.checked:
      spanPetPlayer.innerHTML = inputBulbasaur.id
      petPlayer = inputBulbasaur.id
      break;
    case inputCharmander.checked:
      spanPetPlayer.innerHTML = inputCharmander.id
      petPlayer = inputCharmander.id
      break
    case inputSquirtle.checked:
      spanPetPlayer.innerHTML = inputSquirtle.id
      petPlayer = inputSquirtle.id
      break
    default:
      alert(`Please, select your pet`)
      location.reload()
      break;
  }

  pullAttacks(petPlayer)

  selectPetEnemy()
}

buttonPetPlayer.addEventListener('click', selectPetPlayer);

const restartGame = () => {
  location.reload();
}

restartButton.addEventListener('click', restartGame)