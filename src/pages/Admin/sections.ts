import { z } from 'zod';
import type { SectionConfig } from '../../types/content';

const req = (label: string) => z.string().min(1, `${label} is required`);

export const sections: SectionConfig[] = [
  {
    key: 'hero',
    path: 'hero',
    label: 'Hero Section',
    editor: 'object',
    fields: [
      { name: 'title', label: 'Title (before highlight)', type: 'text' },
      { name: 'highlight', label: 'Highlighted Text', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'primaryCta', label: 'Primary Button Text', type: 'text' },
      { name: 'secondaryCta', label: 'Secondary Button Text', type: 'text' },
    ],
    schema: z.object({
      title: req('Title'),
      highlight: req('Highlighted text'),
      subtitle: z.string().optional(),
      primaryCta: req('Primary button text'),
      secondaryCta: req('Secondary button text'),
    }),
  },
  {
    key: 'storeInfo',
    path: 'store-info',
    label: 'Store Info',
    editor: 'object',
    fields: [
      { name: 'shopName', label: 'Shop Name', type: 'text' },
      { name: 'tagline', label: 'Tagline', type: 'textarea' },
      { name: 'address', label: 'Address (use Enter for new lines)', type: 'textarea' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'hours', label: 'Working Hours (use Enter for new lines)', type: 'textarea' },
    ],
    schema: z.object({
      shopName: req('Shop name'),
      tagline: z.string().optional(),
      address: req('Address'),
      phone: req('Phone'),
      email: z.string().email('Invalid email').min(1, 'Email is required'),
      hours: req('Working hours'),
    }),
  },
  {
    key: 'about',
    path: 'about-story',
    label: 'About — Story',
    editor: 'object',
    fields: [
      { name: 'storyTitle', label: 'Section Title', type: 'text' },
      { name: 'storyText', label: 'Story (separate paragraphs with a blank line)', type: 'textarea' },
    ],
    schema: z.object({
      storyTitle: req('Section title'),
      storyText: req('Story text'),
    }),
  },
  {
    key: 'aboutValues',
    path: 'about-values',
    label: 'About — Values',
    editor: 'list',
    fields: [
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'text', label: 'Description', type: 'textarea' },
    ],
    itemSchema: z.object({
      icon: req('Icon'),
      title: req('Title'),
      text: z.string().optional(),
    }),
  },
  {
    key: 'categories',
    path: 'categories',
    label: 'Categories',
    editor: 'list',
    fields: [
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'color', label: 'Accent Colour', type: 'color' },
    ],
    itemSchema: z.object({
      icon: req('Icon'),
      label: req('Label'),
      color: req('Colour'),
    }),
  },
  {
    key: 'highlights',
    path: 'highlights',
    label: 'Why Choose Us',
    editor: 'list',
    fields: [
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    itemSchema: z.object({
      icon: req('Icon'),
      title: req('Title'),
      description: z.string().optional(),
    }),
  },
  {
    key: 'testimonials',
    path: 'testimonials',
    label: 'Testimonials',
    editor: 'list',
    fields: [
      { name: 'name', label: 'Customer Name', type: 'text' },
      { name: 'role', label: 'Role / Title', type: 'text' },
      { name: 'text', label: 'Testimonial', type: 'textarea' },
    ],
    itemSchema: z.object({
      name: req('Customer name'),
      role: z.string().optional(),
      text: req('Testimonial'),
    }),
  },
  {
    key: 'products',
    path: 'products',
    label: 'Products',
    editor: 'list',
    fields: [
      { name: 'name', label: 'Product Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'price', label: 'Price (₹)', type: 'number' },
    ],
    itemSchema: z.object({
      name: req('Product name'),
      description: z.string().optional(),
      category: req('Category'),
      price: z.number().min(0, 'Price must be 0 or more'),
    }),
  },
];

export const getSectionByPath = (path: string | undefined) => {
  return sections.find((s) => s.path === path) || null;
};

export const getValidationSchema = (config: SectionConfig) => {
  if (config.editor === 'object') return config.schema;
  return z.object({ items: z.array(config.itemSchema!) });
};
