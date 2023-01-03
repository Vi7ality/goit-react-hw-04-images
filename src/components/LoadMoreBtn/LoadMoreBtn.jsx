import css from './LoadMoreBtn.module.css';
import PropTypes from 'prop-types'
export function LoadMoreBtn ({onClick}) {

    return (
      <button type="button" className={css.Button} onClick={onClick}>
        Load More
      </button>
    );
  }

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}