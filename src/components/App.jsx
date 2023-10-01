import { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from './servises/pixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loader: false,
    showModal: false,
    selectedPhoto: null,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loader: true });
      fetchImages(searchQuery, page)
        .then(({ data: { totalHits, hits } }) => {
          if (totalHits === 0) {
            return Notiflix.Notify.warning('We have no match');
          }

          this.setState(prevState => ({
            images: page === 1 ? hits : [...prevState.images, ...hits],
            totalImages: totalHits,
          }));
        })
        .catch(error => {
          Notiflix.Notify.failure(`${error.message}`);
        })
        .finally(() => this.setState({ loader: false }));
    }
  }

  onFormSubmit = value => {
    const query = value.toLowerCase().trim();
    if (this.state.searchQuery === query || !query) {
      return;
    }
    this.setState(
      { searchQuery: value, totalImages: 0, page: 1 },
      this.scrollToTop()
    );
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onPhotoClick = url => {
    this.setState({ selectedPhoto: url, showModal: true });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, showModal, selectedPhoto, loader, totalImages } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery images={images} onPhotoClick={this.onPhotoClick} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedPhoto} alt="big_size_photo" />
          </Modal>
        )}
        {loader && <Loader />}
        {totalImages !== images.length && !loader && (
          <Button loadMore={this.onLoadMore} />
        )}
      </div>
    );
  }
}
