import type { CollectionConfig } from 'payload';
import sharp from 'sharp';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const file = req.file;
        if (file?.data && file.mimetype?.startsWith('image/')) {
          try {
            const blurred = await sharp(file.data)
              .resize(20, 20, { fit: 'inside' })
              .jpeg({ quality: 20 })
              .toBuffer();
            data.blurDataURL = `data:image/jpeg;base64,${blurred.toString('base64')}`;
          } catch {
            // Non-processable image (e.g. SVG), skip blur generation
          }
        }
        return data;
      },
    ],
  },
  upload: {
    staticDir: '../public/media',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
};
