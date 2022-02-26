const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const moment = require("moment");
 
//these are my thought types 
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minLength: 5,
            maxLength: 500,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            //moment = month, day, yr, and time
            get: () => moment().format("lll"),
        },
        userName: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema],
    } ,
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }      
);

//documents being retuned to reactions
thoughtSchema.virtual("reactionCount").get(function () {
    return `${this.reactions}`;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
