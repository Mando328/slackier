<div align = "center">
 
```
   _____  __     ___    ______ __ __  ____ ______ ____ 
  / ___/ / /    /   |  / ____// //_/ /  _// ____// __ \
  \__ \ / /    / /| | / /    / ,<    / / / __/  / /_/ /
 ___/ // /___ / ___ |/ /___ / /| | _/ / / /___ / _, _/ 
/____//_____//_/  |_|\____//_/ |_|/___//_____//_/ |_|  
                                                       
```
</div>

# What is this?
Slackier is a learning project created for Hack Club Stardance. It is a simple Slack bot that can play roulette and fetch data from API. During the development I learned how to host bots and how slack API works.


## Commands:

- `/slackier-ping` — responds with latency.
- `/slackier-help` — lists available commands.
- `/slackier-roulette <bet> <red|black|odd|even|0-36>` — plays roulette.
- `/slackier-balance` — shows your current balance.
- `/slackier-no` — fetches a funny rejection from the NAAS API.



## Local development:

### Prerequisites:
 - Node 18 +
 - A Slack app configured for Socket Mode
   
 ### 1 Clone the repo
 ``` bash
git clone https://github.com/Mando328/slackier.git
cd slackier
npm install
```
### 2 Create .env file:
 ``` env
 SLACK_BOT_TOKEN=xoxb-...
 SLACK_APP_TOKEN=xapp-...
```
### 3 Run localy 
```
node index.js
```

## Known issues:
 There is currently no way to increase your balance once you inevitably loose all your life savings playing roulette.
I am thinking about implementing a daily payout to solve this problem.

