import { type FC, type PropsWithChildren } from 'react';

const ErrorText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className='text-sm text-red-400'>{children}</p>
  )
}

export default ErrorText