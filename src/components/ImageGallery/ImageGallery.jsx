import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import PropTypes from 'prop-types';
import ImageGrid from 'components/Loader/Loader';
import { Spinner } from 'components/Spinner/Spinner';
import { useRef, useEffect } from 'react';


export function ImageGallery ({
  images,
  page,
  status,
  totalResults,
  onImageClick,
  onLoadMore,
  showSpinner,
}) {

  const galleryRef = useRef();
  
  useEffect(() => {
    if (galleryRef.current) {
      console.log(galleryRef.current)
          const { height: cardHeight } = galleryRef.current.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    }

  })


  if (status === 'pending' && page === 1) {
    return <ImageGrid></ImageGrid>;
  }

  if (status === 'resolved') {
    return (
      <div className={css.ImageGalleryContainer}>
        <ul className={css.ImageGallery} ref={galleryRef}>
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

        {showSpinner && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner></Spinner>
          </div>
        )}

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
