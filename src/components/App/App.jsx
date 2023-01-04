import { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { Modal } from 'components/Modal/Modal';
import { getImages } from 'service/image-service';
import { toast } from 'react-toastify';


export default function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [srcModalImage, setSrcModalImage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);


  const resetState = () => {
    setPage(1);
    setImages([]);
    setStatus('idle');
    setTotalResults(null);
    setError('');
  };

  const handlerQuerySubmit = query => {
    setSearchQuery(query);
    resetState();
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus('pending');
    getImages(searchQuery, page)
      .then(({ data: { total, hits } }) => {
        if (total === 0) {
          setError(`There is no image with ${searchQuery} name`);
          toast.error(`There is no image with "${searchQuery}" name`);
          setStatus('rejected');
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        setStatus('resolved');
        setTotalResults(total);
      })
      .catch(error => {
        setError(error);
        toast.error(
          'Oops, something went wrong. Check your internet connection or try to reload page.'
        );
        setStatus('rejected');
      })
      .finally(setShowSpinner(false));

    // try {
    //   const {
    //     data: { hits, total }
    //   } = getImages(searchQuery, page);
    //   if (total === 0) {
    //     setError(`There is no image with ${searchQuery} name`);
    //     toast.error(`There is no image with "${searchQuery}" name`);
    //     return;
    //   }
    //   setImages(prevState => [...prevState, ...hits]);
    //   setStatus('resolved');
    //   setTotalResults(total);
    // } catch (error) {
    //   setError(
    //     error
    //   );
    //   toast.error('Oops, something went wrong. Check your internet connection or try to reload page.')
    //   setStatus('rejected');
    // }
  }, [page, searchQuery]);

  const onLoadMore = () => {
    setShowSpinner(true);
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onImageClick = event => {
    toggleModal();
    setSrcModalImage(event.target.srcset);
  };

  return (
    <div className={css.App}>
      <Searchbar handlerSubmit={handlerQuerySubmit}></Searchbar>
      <ImageGallery
        images={images}
        page={page}
        status={status}
        totalResults={totalResults}
        onImageClick={onImageClick}
        onLoadMore={onLoadMore}
        showSpinner={showSpinner}
      ></ImageGallery>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={srcModalImage} alt="" />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}
