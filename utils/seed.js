const connection = require("../config/connection");
const { Reaction, Thought, User} = require("../models");

connection.once("open", async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});
    // await Reaction.deleteMany({});

    const users = [];
    const thought = getRandomThought(10);
    for (let i = 0; i<5; i++) {}

   
await User.collection.insertMany(user);
await Thought.collection.insertOne;

console.table(user);
console.table(thought);
console.table(reaction);
console.timeEnd('seeding');
process.exit(0);
});