import React from 'react';
import { Button } from './ui';
import { Ellipsis } from 'lucide-react';

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
}

export const ShowMore: React.FC<Props> = ({ disabled, onClick }) => {
  return (
    <div className='mt-4 flex items-center justify-center'>
      <Button onClick={onClick} disabled={disabled} size={'icon-sm'} variant={'ghost'}>
        <Ellipsis className='w-4 h-4' />
      </Button>
    </div>
  );
};
