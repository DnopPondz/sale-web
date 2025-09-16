import { isValidObjectId } from 'mongoose';
import { connectToDatabase } from '../../../../lib/db';
import { getModel } from '../../../../lib/models';

export default async function handler(req, res) {
  const { resource, id } = req.query;
  const Model = getModel(resource);

  if (!Model) {
    return res.status(404).json({ error: `Unknown resource: ${resource}` });
  }

  if (typeof id !== 'string' || !isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  await connectToDatabase();

  if (req.method === 'GET') {
    const doc = await Model.findById(id).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(doc);
  }

  if (req.method === 'PUT') {
    const payload = typeof req.body === 'object' && req.body ? req.body : {};
    const updated = await Model.findByIdAndUpdate(id, payload, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const deleted = await Model.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', 'GET,PUT,DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
