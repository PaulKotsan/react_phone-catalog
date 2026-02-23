import React, { useEffect, useRef, useState } from 'react';
import globalStyle from '../../../styles/index.module.scss';
import classNames from 'classnames';
import { useLanguage } from '../../../contexts/LanguageContext';

interface AddToCartButtonProps {
  onClick: () => void;
  /** visual duration in ms */
  activeMs?: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  activeMs = 1000,
}) => {
  const { t } = useLanguage();
  const [addingToCart, setAddingToCart] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleClick = () => {
    if (addingToCart) {
      return;
    }

    setAddingToCart(true);
    try {
      onClick();
    } catch (e) {
      // swallow; visual feedback still useful
    }
  };

  useEffect(() => {
    if (!addingToCart) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setAddingToCart(false);
      timerRef.current = null;
    }, activeMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [addingToCart, activeMs]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={addingToCart}
      aria-pressed={addingToCart}
      className={classNames(globalStyle.btnPrimary, {
        [globalStyle.btnPrimaryActive]: addingToCart,
      })}
    >
      {addingToCart ? t('product.added') : t('product.addToCart')}
    </button>
  );
};
