import { Component } from 'react';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPixabayImages } from '../../src/services/api';
import css from '../components/App.module.css';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    totalHits: null,
    isLoading: false,
    error: null,
  };

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        isLoading: true,
      });
      try {
        const { hits, totalHits } = await getPixabayImages(
          this.state.query,
          this.state.page
        );
        if (totalHits === 0) {
          Notify.warning('Please enter correct data!');
        }
        // this.setState({
        //   images:
        //     this.state.page === 1 ? hits : [...this.state.images, ...hits],
        //   totalHits: totalHits,
        // });
        this.setState(prevState => ({
          images: prevState.page === 1 ? hits : [...prevState.images, ...hits],
          totalHits: totalHits,
        }));
      } catch (error) {
        this.setState({ error: error });
        Notify.failure('Something went wrong');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading && <Loader />}
        {this.state.totalHits > this.state.images.length && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
