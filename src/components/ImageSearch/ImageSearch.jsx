import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';

const API_KEY = '30692971-b147f9a702170160ab831dd90';

export class ImageSearch extends Component {
  static defaultProps = {};

  static propTypes = {};

  render() {
    return (
      <div>
        <Searchbar></Searchbar>
        <ImageGallery></ImageGallery>
      </div>
    );
  }
}
