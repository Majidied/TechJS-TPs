import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { EventEmitter } from 'events';

const game = new EventEmitter();

let playerHP = 300;
let botHP = 300;

// Random number
const rand = max => Math.floor(Math.random() * max);
const hit = acc => rand(100) < acc;

// Simple Pokémon list
const pokemons = ['Pikachu', 'Charmander', 'Bulbasaur', 'Squirtle', 'Eevee'];

// Get Pokémon data
async function getPokemon(name) {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    return res.data;
}

// Pick 5 moves
function pickMoves(moves) {
    return moves.slice(0, 5).map(m => m.move);
}

// Get move details
async function getMove(move) {
    const res = await axios.get(move.url);
    return { name: move.name, power: res.data.power || 20, accuracy: res.data.accuracy || 100 };
}

// Event handlers
game.on('playerAttack', (move, player, bot, botMoves) => {
    if(hit(move.accuracy)) botHP -= move.power;
    console.log(chalk.green(`${player} used ${move.name}! Bot HP: ${botHP}`));

    if(botHP <= 0) return game.emit('end');

    // Bot attacks
    const botMove = botMoves[rand(botMoves.length)];
    game.emit('botAttack', botMove, bot, player);
});

game.on('botAttack', (move, bot, player) => {
    if(hit(move.accuracy)) playerHP -= move.power;
    console.log(chalk.red(`${bot} used ${move.name}! Your HP: ${playerHP}`));

    if(playerHP <= 0) return game.emit('end');
});

game.on('end', () => {
    if(playerHP <= 0 && botHP <= 0) console.log(chalk.yellow("Draw!"));
    else if(playerHP <= 0) console.log(chalk.red("You lost!"));
    else console.log(chalk.green("You won!"));
    process.exit();
});

// Main function
async function start() {
    console.log(chalk.yellow("Welcome to Pokémon CLI Battle!"));

    const { playerChoice } = await inquirer.prompt([{
        type: 'list',
        name: 'playerChoice',
        message: 'Choose your Pokémon:',
        choices: pokemons
    }]);

    const playerPokemon = await getPokemon(playerChoice);
    const botChoice = pokemons[rand(pokemons.length)];
    const botPokemon = await getPokemon(botChoice);

    console.log(chalk.green(`You chose: ${playerChoice}`));
    console.log(chalk.red(`Bot chose: ${botChoice}`));

    const playerMoves = await Promise.all(pickMoves(playerPokemon.moves).map(getMove));
    const botMoves = await Promise.all(pickMoves(botPokemon.moves).map(getMove));

    // Game loop
    while(playerHP > 0 && botHP > 0) {
        const { moveChoice } = await inquirer.prompt([{
            type: 'list',
            name: 'moveChoice',
            message: 'Choose your move:',
            choices: playerMoves.map(m => m.name)
        }]);

        const move = playerMoves.find(m => m.name === moveChoice);
        
        // Player attack
        if(hit(move.accuracy)) botHP -= move.power;
        console.log(chalk.green(`${playerChoice} used ${move.name}! Bot HP: ${botHP}`));

        if(botHP <= 0) break;

        // Bot attack
        const botMove = botMoves[rand(botMoves.length)];
        if(hit(botMove.accuracy)) playerHP -= botMove.power;
        console.log(chalk.red(`${botChoice} used ${botMove.name}! Your HP: ${playerHP}`));
    }

    game.emit('end');
}

start();
