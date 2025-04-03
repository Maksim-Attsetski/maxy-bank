import { type Dispatch, type FC, memo, type SetStateAction } from 'react';
import { Box, type SvgIconTypeMap, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import './Tabs.css';

export interface ITabProps {
  title: string;
  to: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };
}

interface IProps {
  tabs: ITabProps[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const TabList: FC<IProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Box className="ui-tabs-i container" sx={{ backgroundColor: 'background.paper' }}>
      {tabs.map((tab) => {
        const TabIcon = tab.icon;
        const isActive = activeTab === tab.to;
        return (
          <Box
            key={tab.to}
            component={motion.div}
            whileHover={{ scale: 1.04 }}
            sx={isActive ? { backgroundColor: 'background.default' } : {}}
            className="tab"
            onClick={() => setActiveTab(tab.to)}
          >
            <TabIcon
              sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}
              fontSize="small"
            />
            <Typography color="text.secondary" fontSize={14}>
              {tab.title}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default memo(TabList);
