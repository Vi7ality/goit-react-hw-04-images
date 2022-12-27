import { Component } from 'react';
import css from './ImageGalleryItem.module.css'



export class ImageGalleryItem extends Component {

    static defaultProps = {};

  static propTypes = {};
  

  render() {
    const {src, alt} = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
      </li>
    );
  }
}
