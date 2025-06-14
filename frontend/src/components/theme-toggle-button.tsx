'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from './ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='flex items-center space-x-3'>
      <Button variant='secondary' onClick={handleToggle} size='icon'>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
