import { Component } from 'react';

import Header from './header/Header';
import { getImages } from 'api/api';
import { Btn } from './Button.style';
import { Loader } from './loader/Loader';
import { ImageGallery } from './gallery/ImageGallery';
export class App extends Component {
  state = {
    images: [],
    filter: '',
    page: 1,
    totalPages: 1,
    isLoad: false,
    openModals: {},
    showBtn: false,
  };

  getData = async () => {
    try {
      const { page, filter } = this.state;
      this.setState({ isLoad: true });
      const { data } = await getImages(page, filter);
      if (data) {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalPages: Math.ceil(data.totalHits / 12),
          isLoad: false,
          showBtn: page < Math.ceil(data.totalHits / 12) ? true : false,
        }));
      }
    } catch (e) {
      this.setState(prevState => ({
        isLoad: false,
        showBtn: false,
      }));
      alert(e);
    }
  };

  findImages = word => {
    this.setState({ images: [], filter: word, page: 1 });
  };

  updatePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.filter !== prevState.filter ||
      this.state.page !== prevState.page
    ) {
      this.getData();
    }
  }

  toggleModal = id => {
    this.setState(prevState => ({
      openModals: {
        ...prevState.openModals,
        [id]: !prevState.openModals[id],
      },
    }));
  };

  render() {
    const { images, isLoad, openModals, showBtn } = this.state;

    return (
      <div>
        <Header findImages={this.findImages} />
        <>
          {images.length > 0 && (
            <ImageGallery images={images} openModals={openModals} />
          )}
          {showBtn && <Btn onClick={this.updatePage}>Load more</Btn>}
        </>
        {isLoad && <Loader />}
      </div>
    );
  }
}
