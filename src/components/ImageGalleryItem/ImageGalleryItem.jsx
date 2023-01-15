// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalShown: false,
  };

  onSwitchModal = () => {
    // this.setState({ isModalShown: !this.state.isModalShown });
    this.setState(prevState => ({ isModalShown: !prevState.isModalShown }));
  };

  render() {
    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={this.onSwitchModal}
          className={css.ImageGalleryItemImage}
          src={this.props.webformatURL}
          alt="img"
        />
        {this.state.isModalShown && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            onClose={this.onSwitchModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
