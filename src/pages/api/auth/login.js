import { connectToDatabase } from '../../../lib/db';
import { User } from '../../../lib/models/User';
import { verifyPassword } from '../../../lib/password';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  await connectToDatabase();

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password +name +email +tel +role');
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const storedPassword = user.get('password');
  if (typeof storedPassword !== 'string' || !verifyPassword(password, storedPassword)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const safeUser = user.toObject();
  delete safeUser.password;
  return res.status(200).json(safeUser);
}
