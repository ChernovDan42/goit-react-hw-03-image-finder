import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ src, tags, largeImg, onPhotoClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onPhotoClick(largeImg)}>
      <img className={css.ImageGalleryItemImage} src={src} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string,
  largeImg: PropTypes.string.isRequired,
  onPhotoClick: PropTypes.func.isRequired,
};
