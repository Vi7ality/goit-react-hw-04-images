import { Component } from 'react';
import css from './Searchbar.module.css'
import { toast } from 'react-toastify';


export class Searchbar extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchQuery === '') {
      toast.warn("Search field is empty")
      return
    }
    this.props.handlerSubmit(this.state.searchQuery);
    this.setState({
      searchQuery: ''
    })

  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={css.SearchFormButton}
          >
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
            className={css.SearchFormInput}
          />
        </form>
      </header>
    );
  }
}
