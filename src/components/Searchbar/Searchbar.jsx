import { Component } from 'react';
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
      alert("Search field is empty")
      return
    }
    this.props.handlerSubmit(this.state.searchQuery);
    this.setState({
      searchQuery: ''
    })

  }

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className="button"
          >
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
