import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css'


export default class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    searchQuery: null,
    response: null,
  };

  handlerQuerySubmit = query => {
    this.setState({
      searchQuery: query,
    });

  };
  render() {
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
          searchQuery={this.state.searchQuery}
        ></ImageGallery>
        <ToastContainer />
      </div>
    );
  }
}
