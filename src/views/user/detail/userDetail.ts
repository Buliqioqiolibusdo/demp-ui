import useDetail from '@/layouts/content/detail/detail';

const useUserDetail = () => {
  return {
    ...useDetail('user'),
  };
};

export default useUserDetail;
