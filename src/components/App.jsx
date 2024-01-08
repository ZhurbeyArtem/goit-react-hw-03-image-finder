import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';

import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem, ImageItem } from './ImageGalleryItem';
import Header from './header/Header';
import { getImages } from 'api/api';
import { Btn } from './Button';
import { Modal } from 'antd';
export class App extends Component {
  state = {
    images: [],
    filter: '',
    page: 1,
    totalPages: 1,
    isLoad: false,
    openModals: {},
  };

  getData = async () => {
    try {
      const { page, filter } = this.state;
      this.setState({ isLoad: true });
      const { data } = await getImages(page, filter);
      if (data) {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalPages: Math.ceil(data.total / 12),
          isLoad: false,
        }));
      }
    } catch (e) {
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

  renderBtn = () => {
    const { totalPages, page } = this.state;
    if (totalPages > 1) {
      if (totalPages !== page) {
        return <Btn onClick={this.updatePage}>Load more</Btn>;
      }
    }
  };
  toggleModal = id => {
    this.setState(prevState => ({
      openModals: {
        ...prevState.openModals,
        [id]: !prevState.openModals[id],
      },
    }));
  };

  render() {
    const { images, isLoad, openModals } = this.state;
    return (
      <div>
        <Header findImages={this.findImages} />
        {!isLoad ? (
          <>
            <ImageGallery>
              {images &&
                images.map(e => (
                  <ImageGalleryItem key={e.id}>
                    <ImageItem
                      src={e.webformatURL}
                      alt={e.tags}
                      onClick={() => this.toggleModal(e.id)}
                    />
                    <Modal
                      width="1200px"
                      open={openModals[e.id]}
                      onCancel={() => this.toggleModal(e.id)}
                      footer={null}
                      centered={true}
                      closable={false}
                    >
                      <img
                        src={e.largeImageURL}
                        style={{ maxWidth: '100%', width: '100%' }}
                        alt={e.tags}
                      ></img>
                    </Modal>
                  </ImageGalleryItem>
                ))}
            </ImageGallery>
            {this.renderBtn()}
          </>
        ) : (
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{ margin: '40vh auto', display: 'block' }}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        )}
      </div>
    );
  }
}
