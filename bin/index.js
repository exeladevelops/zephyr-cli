#!/usr/bin/env node

// fetch the statistics from a garys mod server using gamedig
// use nanospinner to show a spinner while waiting for the data
// then print the player count, server name, and map to the console and use chalk to color the output the data values green
// list the players using a foreach loop then save them to a variable, color the player names cyan
// finally, print the player names to the console using boxen

// import the gamedig module
import gamedig from 'gamedig';
// import the nanospinner module
import { createSpinner } from 'nanospinner';
// import chalk module
import chalk from 'chalk';
//import boxen module
import boxen from 'boxen';

// create a spinner
const spinner = createSpinner();
//start the spinner with the message "Loading server data..."
spinner.start({ text: 'Loading server data...' });

// quuery the server
gamedig.query({
  type: 'garrysmod',
  host: '208.103.169.68', // server ip
  port: '27015', // server port
  maxAttempts: 3, // number of attempts to connect to the server
  timeout: 10000, // 10 seconds
}).then((state) => {
  // stop the spinner with a success message stating the player count, server name, and map to the console then color the variables bright yellow
  spinner.success({ text: `${chalk.yellowBright(state.players.length)}/${chalk.yellowBright(state.maxplayers)} players playing ${chalk.yellowBright(state.name)} on ${chalk.yellowBright(state.map)}.` });
  // list the players using a foreach loop then save them to a variable
  const players = state.players.map((player) => {

    // if players name is null then chagnge it to "Connecting..."
    if (player.name === "") {
      player.name = '[USER CONNECTING...]';
    }

    // return the player name and color it bright blue
    return `${chalk.blueBright(player.name)}`;
  });
  // print the players to the console using boxen
  console.log(boxen(players.join('\n'), { padding: 1, margin: 0, borderColor: 'white', borderStyle: 'round' }));
}).catch((error) => {
  // stop the spinner with a error message stating the error
  spinner.error({ text: error });
});