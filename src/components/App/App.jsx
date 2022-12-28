import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { Modal } from 'components/Modal/Modal';

export default class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    searchQuery: null,
    response: null,
    showModal: false,
  };

  handlerQuerySubmit = query => {
    this.setState({
      searchQuery: query,
    });
  };

  toggleModal = () => {
    this.setState(({showModal} ) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (event) => {
    this.toggleModal();
    this.setState({
      srcModalImage: event.target.srcset,
    })
  }
  render() {
    const { searchQuery, showModal, srcModalImage } = this.state;
    return (
      <div
        // style={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   fontSize: 40,
        //   color: '#010101',
        // }}
        className={css.App}
      >
        <Searchbar handlerSubmit={this.handlerQuerySubmit}></Searchbar>
        <ImageGallery
          searchQuery={searchQuery}
          toggleModal={this.toggleModal}
          onImageClick={this.onImageClick}
        ></ImageGallery>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={srcModalImage}
              alt=""
            />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
