import { useCart } from '../CartProvider/CartProvider';
import { BackButton } from '../shared/BackButton';
import { CartItemHolder } from './CartItem';
import { useLanguage } from '../../contexts/LanguageContext';

import styles from './CartPage.module.scss';
import globalStyle from '../../styles/index.module.scss';

export const CartPage = () => {
  const { getFromCart } = useCart();
  const { getTotal } = useCart();
  const { t } = useLanguage();
  const itemsInCart = getFromCart();
  const totalPrice = getTotal(itemsInCart).allPrice();
  const totalItems = getTotal(itemsInCart).Items();

  return (
    <div className={styles.cartPage__Container}>
      {totalItems > 0 ? (
        <>
          <BackButton />
          <h1>{t('cart.title')}</h1>
          <div className={styles.cartPage__Body}>
            <div className={styles.cartPage__ItemList}>
              {itemsInCart.map(item => (
                <CartItemHolder item={item} key={item.id} />
              ))}
            </div>
            <div className={styles.cartPage__Info}>
              <div className={styles.cartPage__InfoHeader}>
                <h1>${totalPrice}</h1>
                <p>
                  {t('cart.totalFor')} {totalItems} {t('favorites.items')}
                </p>
              </div>
              <button
                className={`${globalStyle.btnPrimary} ${styles.cartButton}`}
              >
                {t('cart.checkout')}
              </button>
            </div>
          </div>
        </>
      ) : (
        <img
          src="img/cart-is-empty.png"
          alt={t('cart.emptyAlt')}
          className={globalStyle.emptyStateImage}
        />
      )}
    </div>
  );
};
