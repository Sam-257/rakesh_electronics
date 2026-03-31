import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '../services/contentService';

const varMap: Record<string, string> = {
  colorPrimary: '--color-primary',
  colorPrimaryDark: '--color-primary-dark',
  colorPrimaryLight: '--color-primary-light',
  colorSecondary: '--color-secondary',
  colorAccent: '--color-accent',
  colorText: '--color-text',
  colorTextLight: '--color-text-light',
  colorBg: '--color-bg',
  colorBgAlt: '--color-bg-alt',
  colorBorder: '--color-border',
  heroGradientStart: '--color-hero-gradient-start',
  heroGradientMid: '--color-hero-gradient-mid',
  heroGradientEnd: '--color-hero-gradient-end',
  headerGradientStart: '--color-header-gradient-start',
  headerGradientEnd: '--color-header-gradient-end',
  footerBg: '--color-footer-bg',
};

export const useTheme = () => {
  const { data: theme } = useQuery({
    queryKey: ['content', 'theme'],
    queryFn: () => getContent('theme'),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    for (const [key, cssVar] of Object.entries(varMap)) {
      const value = theme[key as keyof typeof theme];
      if (value) root.style.setProperty(cssVar, value);
    }
  }, [theme]);
};
