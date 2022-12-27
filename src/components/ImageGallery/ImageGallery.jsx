import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const API_KEY = '30692971-b147f9a702170160ab831dd90';

export class ImageGallery extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    images: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const newQuery = this.props.searchQuery;

      if (prevQuery !== newQuery) {
        this.setState({ status: 'pending' });

        try {
          const response = await axios
            .get(
              `https://pixabay.com/api/?q=${newQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
          this.setState({
            images: response.data.hits,
            status: 'resolved',
          });
        } catch (error) {
          this.setState({ error: 'Oops, something went wrong. Check your internet connection or try to reload page.', status: 'rejected' });
            console.log(error);
        }

    }
  }

  render() {
    const { images, status, error } = this.state;

    if (status === 'pending') {
      return <Loader></Loader>;
    }
    if(status === 'rejected') {
              return <h1>{error}</h1>
    }
    if (status === 'resolved') {
      return <div>{images && <ul className="gallery">{this.state.images.map(image => {
        const { previewURL, pageURL, id } = image;
        return <ImageGalleryItem src={previewURL} url={pageURL} id={id}></ImageGalleryItem>
      })}</ul>}</div>;
      }
          
    }
    

}
