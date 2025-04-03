import { Skeleton as MuiSkeleton, type SkeletonProps } from '@mui/material';
import { type FC, memo } from 'react';

interface IProps extends SkeletonProps {
  loading: boolean;
}

const Skeleton: FC<IProps> = ({ loading, children, ...props }) => {
  return loading ? <MuiSkeleton {...props} animation="wave" /> : children;
};

export default memo(Skeleton);
