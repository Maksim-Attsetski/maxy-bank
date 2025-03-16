import React, { type FC, memo, type ReactNode } from 'react';

import './CardWithAction.css';
import { Card } from 'app/shared/ui';
import type { ICardProps } from 'app/shared/ui/Card';

interface IProps extends ICardProps {
  action: ReactNode;
}

const CardWithAction: FC<IProps> = ({ action, ...props }) => {
  return (
    <div className="components-CardWithAction">
      <Card {...props} />
      <div className="components-CardWithAction__right-action bg-bg-paper">{action}</div>
    </div>
  );
};

export default memo(CardWithAction);
