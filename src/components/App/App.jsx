import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { Modal } from 'components/Modal/Modal';
import { getImages } from 'service/image-service';
import { toast } from 'react-toastify';

export default class App extends Component {
  

  static propTypes = {};

  state = {
    searchQuery: null,
    response: null,
    showModal: false,
    page: 1,
    totalResults: null,
    images: [],
    status: 'idle',
    error: '',
  };

  handlerQuerySubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      status: 'idle',
      totalResults: null,
      error: '',
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;

    const { page } = this.state;

    if (prevQuery !== newQuery || prevState.page !== page) {
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
        toast.error(`There is no image with "${query}" name`);
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
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = event => {
    this.toggleModal();
    this.setState({
      srcModalImage: event.target.srcset,
    });
  };
  render() {
    const {
      searchQuery,
      page,
      totalResults,
      images,
      status,
      srcModalImage,
      showModal,
    } = this.state;
    return (
      <div
        className={css.App}
      >
        <Searchbar handlerSubmit={this.handlerQuerySubmit}></Searchbar>
        <ImageGallery
          searchQuery={searchQuery}
          images={images}
          page={page}
          status={status}
          totalResults={totalResults}
          toggleModal={this.toggleModal}
          onImageClick={this.onImageClick}
          onLoadMore={this.onLoadMore}
        ></ImageGallery>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={srcModalImage} alt="" />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
