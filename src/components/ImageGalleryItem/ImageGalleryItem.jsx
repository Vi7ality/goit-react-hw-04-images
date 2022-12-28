import { Component } from 'react';
import css from './ImageGalleryItem.module.css'



export class ImageGalleryItem extends Component {

    static defaultProps = {};

  static propTypes = {};
  

  render() {
    const {src, alt, url} = this.props;
    return (
      <li className={css.ImageGalleryItem} onClick={this.props.onClick}>
        <img src={src} alt={alt} srcSet={url} className={css.ImageGalleryItemImage} />
      </li>
    );
  }
}
