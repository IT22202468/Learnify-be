// userController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserByEmail, getUserProfile } from '../models/userModel.js';

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

//Register user
export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const hashedPassword = await bcrypt.hash(password,saltRounds);

  try {
    await createUser(fullname, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//Verify user
export const verifyUser = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if(userId){
      return res.status(200).json({ message: 'User verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid token' });
    }
} catch (error) {
    res.status(500).json({ message: 'Error verifying user', error });
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
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.Id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error occured', error });
  }
};


// get USer Profile
export const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};