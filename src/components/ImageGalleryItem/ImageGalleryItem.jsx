import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ src, alt, url, onClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        srcSet={url}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
