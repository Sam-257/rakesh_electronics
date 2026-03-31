import type { ContentKey, ContentMap } from '../types/content';

const API_BASE = '/api/content';

export const getContent = async <K extends ContentKey>(key: K): Promise<ContentMap[K]> => {
  const res = await fetch(`${API_BASE}/${key}`);
  const json = await res.json();
  return json.data;
};

export const setContent = async <K extends ContentKey>(key: K, value: ContentMap[K]) => {
  await fetch(`${API_BASE}/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  });
};

export const resetContent = async (key: ContentKey) => {
  await fetch(`${API_BASE}/${key}`, { method: 'DELETE' });
};
