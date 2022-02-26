const { User, Thought } = require("../models");
const userSchema = require("../models/User");

module.exports = {
  // GET all users
  getUser(req, res) {
    User.find()
      //replaces thought with user
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // return res.json(userObj);
  // const userObj = {
  //   user,

  // GET a single user, populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) =>
        // console.log(err);
        res.status(500).json(err)
      );
  },
  // POST a new user:
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE to remove user by its _id
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No such user exists" })
            : res.json({ message: "User deleted!" })
        //  : Thought.deleteMany({ _id: { $in: course.user } })
      )

      .catch((err) => res.status(500).json(err));
  },
  //create friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } }
    )
      .then((friend) => res.status(200).json(friend))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .then(() => res.json({ message: "Friend deleted" }))
      .catch((err) => res.status(500).json(err));
  },
};
