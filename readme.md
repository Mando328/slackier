<div align="center">

<pre>
 _________.____       _____  _________  ____  __._____.___.
/   _____/|    |     /  _  \ \_   ___ \|    |/ _|\__  |   |
\_____  \ |    |    /  /_\  \/    \  \/|      <   /   |   |
/        \|    |___/    |    \     \___|    |  \  \____   |
/_______  /|_______ \____|__  /\______  /____|__ \ / ______|
        \/         \/       \/        \/        \/ \/
</pre>

</div>

# Slackier

A small Slack bot made for Hackclub Stardance. It served as a learning exercise. During the build I learned:
- How to bulid slack bots
- How to use NAAS API
- How to host bots on hackclubs own servers "Nest"

## Commands:

- `/slackier-ping` — responds with latency.
- `/slackier-help` — lists available commands.
- `/slackier-roulette <bet> <red|black|odd|even|0-36>` — plays roulette.
- `/slackier-balance` — shows your current balance.
- `/slackier-no` — fetches a funny rejection from the NAAS API.

___

## Local development

### Prerequisites

- Node.js 18+ (or a current LTS version)
- A Slack app configured for Socket Mode

### 1) Clone the repo and install dependecies

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



## Known issues:
 There is currently no way to increase your balance once you inevitably loose all your life savings playing roulette.
I am thinking about implementing a daily payout to solve this problem.


