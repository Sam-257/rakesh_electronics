import { useSuspenseQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type { ContentKey, ContentMap } from '../types/content';
import { getContent, setContent } from '../services/contentService';

export const useContent = <K extends ContentKey>(key: K) => {
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ['content', key],
    queryFn: () => getContent(key),
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: (value: ContentMap[K]) => setContent(key, value),
    onSuccess: (_data, value) => {
      queryClient.setQueryData(['content', key], value);
    },
  });

  return { data, update };
};
