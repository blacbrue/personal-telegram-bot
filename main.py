import os
from dotenv import load_dotenv
import os
from telebot.async_telebot import AsyncTeleBot
import asyncio

load_dotenv()

API_KEY = os.getenv("API_KEY")
bot = AsyncTeleBot(API_KEY, parse_mode = None)

def main():
    @bot.message_handler(func = lambda msg: msg.text == "E" or msg.text == "e")
    async def send_E(msg):
        await bot.send_message(chat_id = msg.chat.id, text = msg.text)

    @bot.message_handler(func = lambda msg: msg)
    async def send(msg):
        if msg.chat.type == "private" and msg.chat.type != "group":
            print("{0} {3} ({2}) sent a message: {1}".format(msg.from_user.first_name, msg.text, msg.chat.id, msg.from_user.last_name))
            # await jayden.send("{0} {3} ({2}) sent a message: {1}".format(msg.from_user.first_name, msg.text, msg.chat.id, msg.from_user.last_name))
            chatId = input("Who would you like to reply to (chat id): ")
            replyText = input("Your answer: ")
            if replyText == "none":
                return
            else:
                await bot.send_message(chat_id = chatId, text = replyText)
    print("Telegram Bot online")
    asyncio.run(bot.infinity_polling())

main()