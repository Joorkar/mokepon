const spanPetPlayer = document.getElementById('pet-player')
const spanPetEnemy = document.getElementById('pet-enemy')
const buttonPetPlayer = document.getElementById('button-pet');
const restartButton = document.getElementById('button-restart');

const spanPlayerlifes = document.getElementById('player-lifes')
const spanEnemylifes = document.getElementById('enemy-lifes')

const resultMessage = document.getElementById('result')
const playerAttacksMessage = document.getElementById('player-attacks')
const enemyAttacksMessage = document.getElementById('enemy-attacks')
const cardsContainer = document.getElementById('cards-container')
const containerAttacks = document.getElementById('container-attacks');

let pokemons = []
let attackPlayer = []
let attackEnemy = []
let pokemonsOptions
let inputBulbasaur
let inputCharmander
let inputSquirtle
let petPlayer
let pokemonsAttacks
let pokemonsAttacksEnemy
let buttonFire
let buttonWater
let buttonPlant
let buttons = []
let indexAttackPlayer
let indexAttackEnemy
let victoriesPlayer = 0
let victoriesEnemy = 0
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
  { name: '🌱', id: 'button-plant' },
  { name: '🌱', id: 'button-plant' },
  { name: '🌱', id: 'button-plant' },
  { name: '🔥', id: 'button-fire' },
  { name: '💧', id: 'button-water' },
)

charmander.attacks.push(
  { name: '🔥', id: 'button-fire' },
  { name: '🔥', id: 'button-fire' },
  { name: '🔥', id: 'button-fire' },
  { name: '💧', id: 'button-water' },
  { name: '🌱', id: 'button-plant' },
)

squirtle.attacks.push(
  { name: '💧', id: 'button-water' },
  { name: '💧', id: 'button-water' },
  { name: '💧', id: 'button-water' },
  { name: '🔥', id: 'button-fire' },
  { name: '🌱', id: 'button-plant' },
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
  newPlayerAttack.innerHTML = indexAttackPlayer
  newEnemyAttack.innerHTML = indexAttackEnemy

  playerAttacksMessage.appendChild(newPlayerAttack)
  enemyAttacksMessage.appendChild(newEnemyAttack)
}

const createFinalMessage = (finalResult) => {
  resultMessage.innerHTML = finalResult
  sectionInicialNone[1].style.display = 'block'
}

const chechVictories = () => {
  if (victoriesPlayer === victoriesEnemy) {
    createFinalMessage(`This was a draw! 😐`)
  } else if (victoriesPlayer > victoriesEnemy) {
    createFinalMessage(`Congratulations! Your Win 🎉`)
  } else {
    createFinalMessage(`Sorry! Your Lose 😔`)
  }
}

const indexBothRivals = (player, enemy) => {
  indexAttackPlayer = attackPlayer[player]
  indexAttackEnemy = attackEnemy[enemy]
}

const combat = () => {
  for (let i = 0; i < attackPlayer.length; i++) {
    if (attackPlayer[i] === attackEnemy[i]) {
      indexBothRivals(i, i)
      createMessage('DEAD HEAT 😑')
    } else if (attackPlayer[i] === 'FIRE' && attackEnemy[i] === 'PLANT') {
      indexBothRivals(i, i)
      createMessage('WIN ✅')
      victoriesPlayer++
      spanPlayerlifes.innerHTML = victoriesPlayer
    } else if (attackPlayer[i] === 'WATER' && attackEnemy[i] === 'FIRE') {
      indexBothRivals(i, i)
      createMessage('WIN ✅')
      victoriesPlayer++
      spanPlayerlifes.innerHTML = victoriesPlayer
    } else if (attackPlayer[i] === 'PLANT' && attackEnemy[i] === 'WATER') {
      indexBothRivals(i, i)
      createMessage('WIN ✅')
      victoriesPlayer++
      spanPlayerlifes.innerHTML = victoriesPlayer
    } else {
      indexBothRivals(i, i)
      createMessage('LOSE ❌')
      victoriesEnemy++
      spanEnemylifes.innerHTML = victoriesEnemy
    }
  }
  chechVictories()
}



const initFight = () => {
  if (attackPlayer.length === 5) {
    combat()
  }
}

const attackRandomEnemy = () => {
  let attackRandom = random(0, pokemonsAttacksEnemy.length - 1)

  switch (true) {
    case attackRandom === 0 || attackRandom === 1:
      attackEnemy.push('FIRE')
      break;
    case attackRandom === 3 || attackRandom === 4:
      attackEnemy.push('WATER')
      break;
    default:
      attackEnemy.push('PLANT')
      break;
  }
  console.log(attackEnemy);
  initFight()
}

const attackSequence = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (e.target.textContent === '🔥') {
        attackPlayer.push('FIRE')
        button.style.background = '#112f58'
        console.log(attackPlayer)
        button.disabled = true
      } else if (e.target.textContent === '💧') {
        attackPlayer.push('WATER')
        console.log(attackPlayer)
        button.style.background = '#112f58'
        button.disabled = true
      } else if (e.target.textContent === '🌱') {
        attackPlayer.push('PLANT')
        console.log(attackPlayer)
        button.style.background = '#112f58'
        button.disabled = true
      }
      attackRandomEnemy()
    })
  })
}

const selectPetEnemy = () => {
  let petRandom = random(0, pokemons.length - 1)

  spanPetEnemy.innerHTML = pokemons[petRandom].name
  pokemonsAttacksEnemy = pokemons[petRandom].attacks
  attackSequence()
}

const showAttacks = (attacks) => {
  attacks.forEach((attack) => {
    pokemonsAttacks = `
    <button id=${attack.id} class="button-attack BAttack">${attack.name}</button>
    `

    containerAttacks.innerHTML += pokemonsAttacks
  })

  buttonFire = document.getElementById('button-fire')
  buttonWater = document.getElementById('button-water')
  buttonPlant = document.getElementById('button-plant')
  buttons = document.querySelectorAll('.BAttack')
}

const pullAttacks = (petPlayer) => {
  let attacks

  /* for (let i = 0; i < pokemons.length; i++) {
    if (petPlayer === pokemons[i].name) {
      attacks = pokemons[i].attacks
    }
  } */

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
      restartGame()
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