import React, { type FC } from 'react';

import { useUsers } from 'app/entities/users';
import { Card } from 'app/shared';

const ProfileUserInfo: FC = () => {
  const { user } = useUsers();

  return (
    <Card withScale={false}>
      <h2 className="text-center">
        {user?.last_name} {user?.first_name} {user?.middle_name}
      </h2>
      <br />
      <p>{user?.gender}</p>
      <p>{user?.birthed_at}</p>
    </Card>
  );
};

export default ProfileUserInfo;
