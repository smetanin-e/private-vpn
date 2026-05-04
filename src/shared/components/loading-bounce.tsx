import React from 'react';

interface Props {
  className?: string;
}

export const LoadingBounce: React.FC<Props> = () => {
  return (
    <div className='absolute rounded-md inset-0 bg-slate-800/50  backdrop-blur-sm flex items-center justify-center overflow-hidden'>
      <div className='flex space-x-2'>
        <span className='w-2 h-2 bg-primary opacity-50 rounded-full animate-bounce [animation-delay:-0.3s]' />
        <span className='w-2 h-2 bg-primary opacity-50 rounded-full animate-bounce [animation-delay:-0.15s]' />
        <span className='w-2 h-2 bg-primary opacity-50 rounded-full animate-bounce' />
      </div>
    </div>
  );
};
