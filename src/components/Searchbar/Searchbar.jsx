import { Component } from 'react';

export class Searchbar extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        <form>
          <label htmlFor="">
            <p>Search</p>
            <input
              type="text"
              name="searchQuery"
              onChange={this.handleQueryChange}
            />
          </label>
        </form>
        <button type="submit"></button>
      </div>
    );
  }
}
