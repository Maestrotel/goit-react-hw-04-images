import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [isModalShown, setIsModalShown] = useState(false);

  const onSwitchModal = () => {
    // this.setState({ isModalShown: !this.state.isModalShown });
    setIsModalShown(prevState => !prevState);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={onSwitchModal}
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt="img"
      />
      {isModalShown && (
        <Modal largeImageURL={largeImageURL} onClose={onSwitchModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
