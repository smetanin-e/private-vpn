import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { cn } from '../lib/utils';

interface Props {
  className?: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export const ShowPasswordIcon: React.FC<Props> = ({ showPassword, setShowPassword, className }) => {
  const onClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
        className,
      )}
    >
      {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
    </button>
  );
};
