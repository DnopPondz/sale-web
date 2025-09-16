import { connectToDatabase } from '../../../../lib/db';
import { getModel } from '../../../../lib/models';

function parseNumber(value, fallback) {
  if (Array.isArray(value)) value = value[0];
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default async function handler(req, res) {
  const { resource } = req.query;
  const Model = getModel(resource);

  if (!Model) {
    return res.status(404).json({ error: `Unknown resource: ${resource}` });
  }

  await connectToDatabase();

  if (req.method === 'GET') {
    const limit = Math.min(Math.max(parseNumber(req.query.limit, 50), 1), 200);
    const page = Math.max(parseNumber(req.query.page, 1), 1);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Model.find().skip(skip).limit(limit).lean(),
      Model.countDocuments(),
    ]);

    res.setHeader('X-Total-Count', String(total));
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    const payload = typeof req.body === 'object' && req.body ? req.body : {};
    const created = await Model.create(payload);
    return res.status(201).json(created);
  }

  res.setHeader('Allow', 'GET,POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
