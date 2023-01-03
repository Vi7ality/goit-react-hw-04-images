import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import PropTypes from 'prop-types';
import ImageGrid from 'components/Loader/Loader';

export function ImageGallery({
  images,
  page,
  status,
  totalResults,
  onImageClick,
  onLoadMore,
}) {
  if (status === 'pending') {
    return <ImageGrid></ImageGrid>;
  }

  if (status === 'resolved') {
    return (
      <div className={css.ImageGalleryContainer}>
        <ul className={css.ImageGallery}>
          {images.map(image => {
            const { webformatURL, id, tags, largeImageURL } = image;
            return (
              <ImageGalleryItem
                onClick={onImageClick}
                src={webformatURL}
                key={id}
                alt={tags}
                url={largeImageURL}
              ></ImageGalleryItem>
            );
          })}
        </ul>
        {page < totalResults / 15 && (
          <LoadMoreBtn onClick={onLoadMore}></LoadMoreBtn>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalResults: PropTypes.number,
  onImageClick: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
