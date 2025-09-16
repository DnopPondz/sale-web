import { connectToDatabase } from '../../../lib/db';
import { User } from '../../../lib/models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, tel, password } = req.body || {};
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (typeof tel !== 'string' || !tel.trim()) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  await connectToDatabase();

  const existing = await User.findOne({ email: email.trim().toLowerCase() }).lean();
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    tel: tel.trim(),
    password,
    role: 'user',
  });

  return res.status(201).json(user.toObject());
}
