const { Thought, User } = require("../models");
const reactionSchema = require("../models/reaction");

module.exports = {
  //GET to get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Get to a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      //creating an id field by starting at 0 and counting up after an array is updated
      .select("-__v")
      .then((thought) =>
        //no thought
        !thought
          ? //asking a question as it goes on
            res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST to create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //PUT to update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      //overwrite=false (boolean)
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE to remove a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ message: "You have deleted you thought and reaction" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //CREATE reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    )
      .then((thought) => res.status(200).json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //DELETE remove a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then(() => res.json({ message: "Reaction deleted" }))
      .catch((err) => res.status(500).json(err));
  },
};
