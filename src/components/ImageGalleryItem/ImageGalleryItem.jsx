import { Component } from 'react';



export class ImageGalleryItem extends Component {

    static defaultProps = {};

  static propTypes = {};
  

  render() {
    const {src, url, id} = this.props;
    return (
      <li class="gallery-item" key={id}>
        <img src={src} url={url} alt="" />
      </li>
    );
  }
}
