# Slackier

A small Slack bot for learning and experimenting with slash commands in Slack.

## What it does

Slackier currently supports:

- `/slackier-ping` — responds with latency.
- `/slackier-help` — lists available commands.
- `/slackier-roulette <bet> <red|black|odd|even|0-36>` — plays roulette and updates an in-memory balance.
- `/slackier-balance` — shows your current in-memory balance.
- `/slackier-no` — fetches a funny rejection from the NAAS API.

## Local development

### Prerequisites

- Node.js 18+ (or a current LTS version)
- A Slack app configured for Socket Mode

### 1) Clone and install dependencies

```bash
git clone https://github.com/Mando328/slackier.git
cd slackier
npm install
```

### 2) Configure environment variables

Create a `.env` file in `/home/runner/work/slackier/slackier`:

```env
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
```

### 3) Run locally

```bash
node index.js
```

You should see:

```text
bot is running!
```

## How it is built

- **Runtime:** Node.js (CommonJS)
- **Slack SDK:** `@slack/bolt`
- **HTTP client:** `axios`
- **Environment management:** `dotenv`

## Process and current limitations

- Built as a learning project focused on simple command handlers and game logic.
- Player balances are kept in memory and reset when the process restarts.
- There is no persistent database yet.

## Credits

- [NAAS API](https://naas.isalman.dev/) for denial responses.
- Built by @Mando328.

## License

ISC (see `package.json`).
