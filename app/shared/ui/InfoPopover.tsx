import { type FC, memo, type ReactNode, useState } from 'react';

// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, Popover } from '@mui/material';
import { useTheme } from '../hooks';

interface IProps {
  info: ReactNode;
}

const InfoPopover: FC<IProps> = ({ info }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
  const isLightMode = useTheme().theme === 'light';

  const onOpenPopover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Popover onClose={onClosePopover} anchorEl={anchorEl} open={!!anchorEl}>
        <Box sx={{ padding: '16px 20px' }}>{info}</Box>
      </Popover>
      <IconButton href="" onClick={onOpenPopover} sx={{ cursor: 'pointer', lineHeight: 0 }}>
        {/* <InfoOutlinedIcon fill={isLightMode ? '#333' : '#fff'} /> */}
        info
      </IconButton>
    </>
  );
};

export default memo(InfoPopover);
