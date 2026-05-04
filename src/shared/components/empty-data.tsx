import React from 'react';

interface Props {
  className?: string;
  text: string;
}

export const EmptyData: React.FC<Props> = ({ text }) => {
  return <div className='text-center py-8 text-muted-foreground'>{text}</div>;
};
