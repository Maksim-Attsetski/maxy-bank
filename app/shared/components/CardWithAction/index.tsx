import { type FC, memo, type ReactNode } from 'react';

import { Card, type CardProps } from 'antd';

import './CardWithAction.css';

interface IProps extends CardProps {
  action?: ReactNode;
}

const CardWithAction: FC<IProps> = ({ action, ...props }) => {
  return (
    <div className="components-CardWithAction">
      <Card {...props} />
      {action && (
        <div className="components-CardWithAction__right-action bg-bg-paper">{action}</div>
      )}
    </div>
  );
};

export default memo(CardWithAction);
