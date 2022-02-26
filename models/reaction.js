const { Schema, Types, model } = require("mongoose");

//creating the reaction types 
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String, 
        required: true,
        minLength:5,
        maxLength: 500,
    },
    userName: {
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = reactionSchema;

