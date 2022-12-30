import { Component } from 'react';
import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';



export class ImageGalleryItem extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };
  

  render() {
    const {src, alt, url} = this.props;
    return (
      <li className={css.ImageGalleryItem} onClick={this.props.onClick}>
        <img src={src} alt={alt} srcSet={url} className={css.ImageGalleryItemImage} />
      </li>
    );
  }
}
