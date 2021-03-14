<div align="center">
  <br />
  <img src=".github/banner.png" width="546" alt="Fubá" />
  <br />
  <p>
    <img src="https://img.shields.io/badge/made%20by-Thales%20Macena-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=visual-studio-code&logoColor=2D325E" alt="Made by Thales Macena">
    <img alt="Top Language" src="https://img.shields.io/github/languages/top/thalesmacena/fuba-discord-bot?color=2D325E&labelColor=F0DB4F&style=for-the-badge&logo=typescript&logoColor=2D325E">
    <a href="https://github.com/thalesmacena/fuba-discord-bot/commits/main">
      <img alt="Last Commits" src="https://img.shields.io/github/last-commit/thalesmacena/fuba-discord-bot?color=2D325E&labelColor=F0DB4F&style=for-the-badge&logo=github&logoColor=2D325E">
    </a>
  </p>
</div>

## 🗂 Tabela de Conteúdo
- [🗂 Tabela de Conteúdo](#-tabela-de-conteúdo)
- [📑 About](#-about)
- [💻 Technologies](#-technologies)
- [✨ Installation](#-installation)
- [⚙️ Config](#️-config)
- [🔥 Running](#-running)
- [🐱 About Fubá (the cat)](#-about-fubá-the-cat)
  
  
## 📑 About
Fubá is a [Discord Bot](https://discord.com/developers/applications) made in [Node.js](https://nodejs.org/en/) using the [Discord.js library](https://discord.js.org/#/). The bot has music commands, which access the youtube api and work with [Node's redable stream object] and playing with [ffmpeg]. In addition, it also has simple commands that work only with the discord api, such as clearing messages and making polls.

## 💻 Technologies

<a href="https://yarnpkg.com/"><img src="https://img.shields.io/badge/-Yarn-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=yarn&logoColor=2D325E" alt="Yarn"></a>

<a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/-Node.JS-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=node.js&logoColor=2D325E" alt="Node.js"></a>

<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-typescript-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=typescript&logoColor=2D325E" alt="Typescript"></a>

<a href="https://eslint.org/"><img src="https://img.shields.io/badge/-ESLint-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=eslint&logoColor=2D325E" alt="ESLint"></a>

<a href="https://discord.js.org/#/"><img src="https://img.shields.io/badge/-Discord-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=discord&logoColor=2D325E" alt="Discord"></a>

<a href="https://discord.js.org/#/"><img src="https://img.shields.io/badge/-Discord.js-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=discord&logoColor=2D325E" alt="Discord.js"></a>

<a href="https://developers.google.com/youtube/v3"><img src="https://img.shields.io/badge/-Youtube-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=youtube&logoColor=2D325E" alt="youtube"></a>

<a href="https://www.ffmpeg.org/"><img src="https://img.shields.io/badge/-FFmpeg-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=c&logoColor=2D325E" alt="FFmpeg"></a>


## ✨ Installation
Open a terminal and run the following commands:

```PowerShell
# To copy this repository
git clone https://github.com/thalesmacena/fuba-discord-bot.git

# To move to project directory
cd fuba-discord-bot

# To install the dependencies
yarn
```

If you are going to run locally you need to install [FFmpeg](https://www.ffmpeg.org/), if you are going to run on a cloud service like Heroku, remember to install a dyno with FFmpeg

## ⚙️ Config
You need to configure some environment variables, so rename the `.env.example` file to `.env`. Then you need to change the values for discord variables. First go to the [discord application page](https://discord.com/developers/applications) and create an application, you can define a name and image for your application, then click on BOT and create a new bot. Copy the token and place it in DISCORD_TOKEN in the file. Then click on OAuth2 select the scope bot and administrator permissions (to save time), copy the link and enter in DISCORD_INVITE, you can access this url to invite the bot to a server. Finally, define a prefix for a character and insert it in DISCORD_PREFIX.

## 🔥 Running
You can run the application in development mode with the command:
```Powershell
# To run
yarn dev
```

in a few seconds the bot will login and load the commands. You can check the commands instruction by text {prefix}help.

## 🐱 About Fubá (the cat)
Fubá is my cat, if you like cats you can check his [instagram profile](https://www.instagram.com/gatofuba/)
