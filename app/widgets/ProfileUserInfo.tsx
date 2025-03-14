import React, { type FC } from 'react';

import { useUsers } from 'app/entities/users';

const ProfileUserInfo: FC = () => {
  const { user } = useUsers();

  return (
    <div>
      <h2 className="text-center">
        {user?.last_name} {user?.first_name} {user?.middle_name}
      </h2>
      <br />
      <p>{user?.gender}</p>
      <p>{user?.birthed_at}</p>
    </div>
  );
};

export default ProfileUserInfo;
