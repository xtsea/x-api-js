import { Bot } from 'grammy';
import { BotToken } from "../config.js";

const bot = new Bot(BotToken);

bot.command("start", async (ctx) => {
  await ctx.reply("Welcome to the bot! 🚀");
});

const InitBot = async () => {
  try {
    await bot.start();
    console.log("Bot is running...");
  } catch (e) {
    console.error("Error", e.message);
  }
}

export { InitBot };
