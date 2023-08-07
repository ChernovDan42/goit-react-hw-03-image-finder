import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from './ImageGallery.module.css'


export function ImageGallery({ images }) {

    return (
        <ul className={css.ImageGallery}>
            {images.map(img => {
                return <ImageGalleryItem key={img.id} src={img.webformatURL} />
            })}

        </ul>
    )
}