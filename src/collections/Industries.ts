import type { CollectionConfig } from 'payload';

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.name) {
          data.slug = slugify(data.name);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated from name',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Hex color for frontend tag styling (e.g. #8000FF)',
      },
    },
  ],
};
