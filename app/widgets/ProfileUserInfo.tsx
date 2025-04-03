import { type FC } from 'react';

import { useUsers } from 'app/entities/users';
import { avatarsImagesUrl } from 'app/shared';
import { Card, Typography } from '@mui/material';

const ProfileUserInfo: FC = () => {
  const { user } = useUsers();

  return (
    <Card>
      {user?.avatar && (
        <Typography textAlign={'center'}>
          <img
            src={avatarsImagesUrl + user?.avatar}
            alt="Avatar"
            width={130}
            height={130}
            style={{ borderRadius: '50%' }}
          />
        </Typography>
      )}
      <Typography textAlign={'center'} variant="h3">
        {user?.last_name} {user?.first_name}
      </Typography>
      <br />
      <Typography variant="h6">Email: {user?.email}</Typography>
      <Typography variant="h6">
        Дата рождения: {user?.birthed_at && new Date(user?.birthed_at).toLocaleDateString()}
      </Typography>
    </Card>
  );
};

export default ProfileUserInfo;
