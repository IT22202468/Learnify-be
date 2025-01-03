import bcrypt from 'bcryptjs';
import createUser from '../models/userModel.js';

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(fullname, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default registerUser;