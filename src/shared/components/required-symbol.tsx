import React from 'react';

interface Props {
  className?: string;
}
export const RequiredSymbol: React.FC<Props> = () => {
  return <span className='text-red-500'>*</span>;
};
