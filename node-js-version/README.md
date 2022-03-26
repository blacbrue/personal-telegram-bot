<!-- HTML in markdown :weirdchamp: -->

<h1>Personal Telegram Bot (in JS)</h1>

<p>This Telegram Bot has been re-written in Javascript (Node.js). You can only reply to the messages with Discord. If you don't have Discord, you will need to use the Python (bad) version :p If it breaks, create an <a href="https://github.com/rushianotpettan/personal-telegram-bot/issues">issue</a> or a <a href="https://github.com/rushianotpettan/personal-telegram-bot/pulls">pull request </a>to fix my code.</p>

<h2 style="text-decoration: underline">Installation</h2>
<ul>
    <li>You will need Node.JS 16.6 or higher in order to run the JS version (way better version) of this bot</li>
</ul>
<ol>
    <li>Run <code>npm install</code> to install dependencies needed to run the bot.</li>
</ol>

<h2 style="text-decoration: underline">Usage</h2>
<ol>
    <li>Create an <code>.env</code> in the root directory. Add this in the <code>.env</code> file: <code>API_KEY = "YOUR TOKEN HERE"</code>. Replace <code>"YOUR TOKEN HERE"</code> with the actual token given by <a href="https://t.me/BotFather">@BotFather</a>. This token will be used to login to the bot. You will also need to add another key: "<code>DISCORD_TOKEN</code>". The value of this key would be the Discord token you get when creating a bot in a Discord application.</li>
    <li>Run <code>node index.js</code> to run the bot. The slash commands will take around an hour to register.</li>
</ol>

<h2 style="text-decoration: underline">What does it do?</h2>
<ul>
    <li>Replies to an "E" or "e" message</li>
    <li>You can reply to someone in Discord (bot dm). It will RARELY bug out if someone is spamming/multiple users are messaging with the bot.</li>
</ul>