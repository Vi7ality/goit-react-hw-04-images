import { ThreeDots } from 'react-loader-spinner';

export function Spinner() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#FF0000"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
      
    />
  );
}
