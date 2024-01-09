import React from 'react';
import { ImageGalleryStyle } from './ImageGallery.style';
import { ImageGalleryItemStyle, ImageItem } from './ImageGalleryItem.style';
import { Modal } from 'antd';

export const ImageGallery = ({ images, openModals }) => {
  return (
    <ImageGalleryStyle>
      {images.map(e => (
        <ImageGalleryItemStyle key={e.id}>
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
        </ImageGalleryItemStyle>
      ))}
    </ImageGalleryStyle>
  );
};
