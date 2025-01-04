import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserByEmail } from '../models/userModel.js';

dotenv.config();

//Register user
export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const hashedPassword = await bcrypt.hash(password,10);

  try {
    await createUser(fullname, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


//Login user
export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log(password, user.Password);
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.Id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });

    // res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occured', error });
  }
};