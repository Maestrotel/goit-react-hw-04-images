import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <div className={css.btn}>
      <button type="button" className={css.Button} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
