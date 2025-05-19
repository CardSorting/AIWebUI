import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'uploads.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(200).json([]);
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving uploads:', error);
    res.status(500).json({ error: 'Error retrieving uploads' });
  }
}
