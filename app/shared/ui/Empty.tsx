import { type FC, type ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
  title: string;
}

const Empty: FC<IProps> = ({ title, children }) => {
  return (
    <>
      <h3>{title}</h3>
      <br />
      {children}
    </>
  );
};

export default Empty;
