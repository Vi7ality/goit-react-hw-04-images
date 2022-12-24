import { ImageSearch } from './ImageSearch/ImageSearch';

export const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ImageSearch></ImageSearch>
    </div>
  );
};
