import { type FC } from 'react';

import { Box } from '@mui/material';
// import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

interface IProps {
  isSuccess: boolean;
}

const SuccessMark: FC<IProps> = ({ isSuccess }) => {
  return (
    isSuccess && (
      <Box sx={{ lineHeight: 0 }}>
        {/* <DoneOutlinedIcon color="success" /> */}
        done
      </Box>
    )
  );
};

export default SuccessMark;
