import MyLoader from 'components/Loader/Loader';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import { getImages } from 'service/image-service';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';

export class ImageGallery extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    page: 1,
    totalResults: null,
    images: [],
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const newQuery = this.props.searchQuery;

    const { page } = this.state;

    if (prevQuery !== newQuery || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      this.getPhotos(newQuery, page);
    }
  }

  getPhotos = async (query, page) => {
    try {
      const {
        data: { hits, total },
      } = await getImages(query, page);
      if (total === 0) {
        this.setState({
          error: `There is no image with "${query}" name`,
          status: 'rejected',
        });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved',
        totalResults: total,
      }));
    } catch (error) {
      this.setState({
        error:
          'Oops, something went wrong. Check your internet connection or try to reload page.',
        status: 'rejected',
      });
      console.log(error);
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { status, error, page, totalResults } = this.state;

    if (status === 'pending') {
      return <MyLoader></MyLoader>;
    }
    if (status === 'rejected') {
      return toast.error(error);
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className={css.ImageGallery}>
            {this.state.images.map(image => {
              const { webformatURL, id, tags } = image;
              return (
                <ImageGalleryItem
                  src={webformatURL}
                  key={id}
                  alt={tags}
                ></ImageGalleryItem>
              );
            })}
          </ul>
          {page < totalResults && <LoadMoreBtn onClick={this.onLoadMore}></LoadMoreBtn>}
        </div>
      );
    }
  }
}
