import { Component } from 'react';
import css from './LoadMoreBtn.module.css';

export class LoadMoreBtn extends Component {
  render() {
    return (
      <button type="button" className={css.Button} onClick={this.props.onClick}>
        Load More
      </button>
    );
  }
}
