import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query === '') {
      Notify.info('Please fill up!');
    }

    onSubmit(query);
    setQuery('');
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
