<!-- HTML in markdown :weirdchamp: -->

<h1>Personal Telegram Bot</h1>

<p>This is a badly written Telegram Bot for personal usage. Written with <a href="https://www.python.org/downloads/release/python-3102/">Python 3.10.2</a> and <a href="https://pypi.org/project/pyTelegramBotAPI/">Telebot</a>. If it breaks down, create an <a href="https://github.com/rushianotpettan/personal-telegram-bot/issues">issue</a> or a <a href="https://github.com/rushianotpettan/personal-telegram-bot/pulls">pull request </a>to fix my bad code.</p>

<p>Note: This bot has not been tested with other Python versions.</p>

[Node.js Version](https://github.com/blacbrue/personal-telegram-bot/tree/main/node-js-version)

<h2 style="text-decoration: underline">Installation</h2>
<ul>
    <li>Run <code>pip install -r requirements.txt</code> to install dependencies needed to run the bot. If you don't have <code>os</code> or <code>asyncio</code> preinstalled in Python, run <code>pip install os asyncio</code></li>
</ul>

<h2 style="text-decoration: underline">Usage</h2>
<ol>
    <li>Create an <code>.env</code> in the root directory. Add this in the <code>.env</code> file: <code>API_KEY = "YOUR TOKEN HERE"</code>. Replace <code>"YOUR TOKEN HERE"</code> with the actual token given by <a href="https://t.me/BotFather">@BotFather</a>. This token will be used to login to the bot.</li>
    <li>Do <code>python main.py</code> to run the bot.</li>
</ol>

<h2 style="text-decoration: underline">What does it do?</h2>
<ul>
    <li>Replies to an "E" or "e" message</li>
    <li>You can reply to someone with the console. It will RARELY bug out if someone is spamming/multiple users are messaging with the bot.</li>
</ul>
