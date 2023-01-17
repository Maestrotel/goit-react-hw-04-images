import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPixabayImages } from '../../src/services/api';
import css from '../components/App.module.css';
import { Notify } from 'notiflix';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  useEffect(() => {
    if (query.trim() === '') return;
    (async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await getPixabayImages(query, page);
        if (totalHits === 0) {
          Notify.warning('Please enter correct data!');
        }

        setImages(prevState => (page === 1 ? hits : [...prevState, ...hits]));
        setTotalHits(totalHits);
        // this.setState(prevState => ({
        //   images: prevState.page === 1 ? hits : [...prevState.images, ...hits],
        //   totalHits: totalHits,
        // }));
      } catch (error) {
        // setError(error.message);
        Notify.failure('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {/* {error && <p>Error</p>} */}
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {totalHits > images.length && <Button onLoadMore={handleLoadMore} />}
    </div>
  );
};
