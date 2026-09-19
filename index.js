require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");
const players = {};


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

function getPlayer(userID)
{
  if (!players[userID]){
    players[userID] = {balance: 100, lastResult: null}
  };
  return players[userID];
}

function ResolveNum(number)
{
  if (!Number.isInteger(number) || number < 0 || number > 36) {
    throw new RangeError("Roulette number must be an integer from 0 to 36");
  }

  const wins = [number];
  const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
  const blackNumbers = new Set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

  if (number === 0) {
    wins.push("green");
  } else {
    wins.push(redNumbers.has(number) ? "red" : "black");
    wins.push(number % 2 === 0 ? "even" : "odd");
  }

  return wins;
}

function wait(milliseconds)
{
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

app.command("/slackier-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/slackier-help", async({ack, respond}) => {
  await ack();
  await respond({text: "/slackier-ping\n/slackier-help\n/slackier-balance\n/slackier-roulette <bet> <red|black|odd|even|0-36>"});
});

app.command("/slackier-balance", async({command, ack}) => {
  const p = getPlayer(command.user_id);
  await ack("Your balance: " + p.balance);
});

app.command("/slackier-roulette", async({command, ack, respond}) => {
  const p = getPlayer(command.user_id);
  const [betstr, choice] = command.text.trim().toLowerCase().split(/\s+/);
  const bet = Number(betstr);
  const numberChoice = /^\d+$/.test(choice || "") ? Number(choice) : null;
  const validChoice = ["red", "black", "odd", "even"].includes(choice)
    || (numberChoice !== null && numberChoice >= 0 && numberChoice <= 36);

  if (!Number.isInteger(bet) || bet <= 0 || !validChoice) {
    await ack("Usage: /slackier-roulette <positive bet> <red|black|odd|even|0-36>");
    return;
  }

  if (bet > p.balance) {
    await ack("You do not have enough money! Try a smaller bet. Your balance: " + p.balance);
    return;
  }

  await ack({
    response_type: "ephemeral",
    text: "Roulette is spinning :black_circle:"
  });

  const number = Math.floor(Math.random() * 37);
  const wins = ResolveNum(number);
  const won = numberChoice !== null ? wins.includes(numberChoice) : wins.includes(choice);

  p.balance -= bet;
  p.lastResult = { number, wins };

  for (const frame of [
    "Roulette is spinning :red_circle:",
    "Roulette is spinning :black_circle:",
    "Roulette is spinning :red_circle:"
  ]) {
    await wait(150);
    await respond({
      replace_original: true,
      text: frame
    });
  }

  if (won) {
    p.balance += bet * (numberChoice !== null ? 35 : 2);
    await respond({
      replace_original: true,
      text: `You won! The number was ${number}. Your balance is: ${p.balance}`
    });
    return;
  }

  await respond({
    replace_original: true,
    text: `You lost. The number was ${number}. Your balance is: ${p.balance}`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();