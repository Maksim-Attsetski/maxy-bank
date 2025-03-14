import React, { type FC } from 'react';

import { useUsers } from 'app/entities/users';
import { avatarsImagesUrl, Card } from 'app/shared';

const ProfileUserInfo: FC = () => {
  const { user } = useUsers();

  return (
    <Card withScale={false}>
      {user?.avatar && (
        <img
          src={avatarsImagesUrl + user?.avatar}
          alt="Avatar"
          className="w-28 h-28 rounded-full mx-auto mb-2"
        />
      )}
      <h2 className="text-center">
        {user?.last_name} {user?.first_name}
      </h2>
      <br />
      <p>{user?.email}</p>
      <p>{user?.birthed_at && new Date(user?.birthed_at).toLocaleDateString()}</p>
    </Card>
  );
};

export default ProfileUserInfo;
