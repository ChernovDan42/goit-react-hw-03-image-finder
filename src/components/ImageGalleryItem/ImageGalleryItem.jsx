import css from './ImageGalleryItem.module.css'

export function ImageGalleryItem({src}) {
    return (
        <li className={css.ImageGalleryItem}>
  <img className={css.ImageGalleryItemImage} src={src} alt="" />
</li>
    )
}