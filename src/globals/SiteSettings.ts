import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Kalebtec',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Technology Consulting',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Expert technology consulting by Rowin and Mari Hernandez.',
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'hello@kalebtec.com',
    },
    {
      type: 'group',
      name: 'social',
      fields: [
        { name: 'github', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
      ],
    },
  ],
}
