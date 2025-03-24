require("dotenv").config();
const zod = require("zod");
const User = require("../models/User");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const signup = async (req, res) => {
  try {
    // INPUT VALIDATION
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Incorrect inputs" });
    }

    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // CREATE USER
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    // Create account
    const userId = user._id;
    try {
      await Account.create({
        userId,
        balance: 1000,
      });
    } catch (error) {
      console.error("Account creation error:", error);
      return res.status(500).json({ message: "Error while creating account" });
    }

    // SEND RESPONSE
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "Error while signing up, please try again later" });
  }
};

const signin = async (req, res) => {
  try {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return res.json({ token });
    }

    res.status(400).json({ message: "Error while logging in" });
  } catch (error) {
    console.error("Signin error:", error);
    res
      .status(500)
      .json({ message: "Error while signing in, please try again later" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res
        .status(411)
        .json({ message: "Error while updating information" });
    }

    await User.updateOne({ _id: req.userId }, req.body);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(500)
      .json({ message: "Error while updating, please try again later" });
  }
};

const getUsers = async (req, res) => {
  console.log('venki', req.body);
  const filter = req.body.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
      //   email Id
      { username: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};

module.exports = { signup, signin, updateUser, getUsers };
