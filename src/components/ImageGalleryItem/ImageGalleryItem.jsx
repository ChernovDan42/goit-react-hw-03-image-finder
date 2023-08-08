import css from './ImageGalleryItem.module.css'

export function ImageGalleryItem({src,largeImg,onPhotoClick}) {
    return (
        <li className={css.ImageGalleryItem} onClick={()=>onPhotoClick(largeImg)}>
  <img className={css.ImageGalleryItemImage} src={src} alt="" />
</li>
    )
}