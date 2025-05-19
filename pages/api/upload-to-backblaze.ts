import { NextApiRequest, NextApiResponse } from 'next';
import B2 from 'backblaze-b2';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const DATA_FILE = path.join(process.cwd(), 'data', 'uploads.json');

// Ensure the data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Initialize the JSON file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function saveMetadata(metadata: any) {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  data.push(metadata);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const b2 = new B2({
        applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
        applicationKey: process.env.B2_APPLICATION_KEY,
      });

      await b2.authorize();

      const {
        data: { uploadUrl, authorizationToken },
      } = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID as string,
      });

      const fileName = `${Date.now()}-${file.originalFilename}`;
      const fileContent = fs.readFileSync(file.filepath);

      const { data } = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName,
        data: fileContent,
      });

      const backblazeUrl = `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${data.fileName}`;

      const metadata = {
        id: Date.now().toString(),
        name: file.originalFilename,
        size: file.size,
        type: file.mimetype,
        backblazeUrl,
        uploadedAt: new Date().toISOString(),
      };

      saveMetadata(metadata);

      res.status(200).json(metadata);
    } catch (error) {
      console.error('Error uploading to Backblaze or saving metadata:', error);
      res.status(500).json({ error: 'Error processing the upload' });
    }
  });
}
