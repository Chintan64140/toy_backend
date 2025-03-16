import prisma from "../config/db.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log('IS_____USERS')
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
