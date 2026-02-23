import { NavLink } from 'react-router-dom';
import { Device } from '../../types';
import styles from './ProductCard.module.scss';
import { useCart } from '../../CartProvider/CartProvider';
import { useFavorites } from '../../FavoritesProvider/FavoritesProvider';

// Component styles
import globalStyle from '../../../styles/index.module.scss';
import { HeartButton } from '../HeartButton';
import { AddToCartButton } from '../AddToCartButton';

interface ProductCardProps {
  device: Device;
}

export const ProductCard: React.FC<ProductCardProps> = ({ device }) => {
  const { addToCart } = useCart();
  const { toggleFavorites } = useFavorites();
  const { isInFavorites } = useFavorites();

  const inFavorites = isInFavorites(device.itemId);

  const handleAddToCart = () => {
    addToCart({
      name: device.name,
      image: device.image,
      id: device.itemId,
      category: device.category,
      price: device.price,
      color: device.color,
      capacity: device.capacity,
    });
  };

  const handleAddToFavorites = () => {
    toggleFavorites({
      id: device.itemId,
      name: device.name,
      fullPrice: device.fullPrice,
      price: device.price,
      screen: device.screen,
      capacity: device.capacity,
      color: device.color,
      ram: device.ram,
      year: device.year,
      image: device.image,
    });
  };

  return (
    <div className={styles.productCard__Container}>
      <NavLink
        to={`/${device.category}/${device.itemId}`}
        className={styles.productCard__Upper}
      >
        <div>
          <img
            src={device.image}
            className={styles.productCard__Image}
          />
        </div>
        <h3 className={styles.productCard__Title}>{device.name}</h3>
        <div className={styles.productCard__PriceContainer}>
          <h2 className={styles.productCard__Price}>${device.price}</h2>
          <h2 className={styles.productCard__Price}>${device.fullPrice}</h2>
        </div>
      </NavLink>

      <div className={styles.productCard__Bottom}>
        <div className={styles.productCard__Specs}>
          <div className={styles.productCard__SpecsSection}>
            <h4>Screen</h4>
            <h4>{device.screen}</h4>
          </div>
          <div className={styles.productCard__SpecsSection}>
            <h4>Capacity</h4>
            <h4>{device.capacity}</h4>
          </div>
          <div className={styles.productCard__SpecsSection}>
            <h4>RAM</h4>
            <h4>{device.ram}</h4>
          </div>
        </div>

        <div className={styles.productCard__InteractionArea}>
          <AddToCartButton onClick={handleAddToCart} />
          <button
            className={`${globalStyle.btnFavorites} ${styles.favoritesButton}`}
            onClick={handleAddToFavorites}
          >
            <HeartButton inFavorites={inFavorites} />
          </button>
        </div>
      </div>
    </div>
  );
};
