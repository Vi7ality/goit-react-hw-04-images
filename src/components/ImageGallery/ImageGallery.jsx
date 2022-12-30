
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import PropTypes from 'prop-types';
import ImageGrid from 'components/Loader/Loader';

export class ImageGallery extends Component {
  static defaultProps = {};

  static propTypes = {
    searchQuery: PropTypes.string,
    images: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    totalResults: PropTypes.number,
    toggleModal: PropTypes.func.isRequired,
    onImageClick: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  };


  render() {
    const { status, page, totalResults, images, onLoadMore } = this.props;

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
                <ImageGalleryItem onClick={this.props.onImageClick}
                  src={webformatURL}
                  key={id}
                  alt={tags}
                  url={largeImageURL }
                ></ImageGalleryItem>
              );
            })}
          </ul>
          {page < totalResults / 15 && <LoadMoreBtn onClick={onLoadMore}></LoadMoreBtn>}
        </div>
      );
    }
  }
}
