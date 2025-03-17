import e from "express";
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
  const { name, email, password, userName, address, bankAccount } = req.body;
  if (name && email && password && userName && address && bankAccount) {
    const findUser = await prisma.user.findUnique(
      {
        where: {
          email: email
        }
      }
    )
    if (findUser) {
      res.status(500).json({ error: 'User is already exist!' });
    } else {
      try {
        const user = await prisma.user.create({
          data: { name, email, password, userName, address, bankAccount },
        });

        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  } else {
    res.status(500).json({ error: 'Something is missing!' });
  }
};
