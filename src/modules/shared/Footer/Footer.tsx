/* eslint-disable import/no-extraneous-dependencies, max-len */
import { NavLink } from 'react-router-dom';

import styles from './Footer.module.scss';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

function ScrollToTopButton() {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div onClick={scrollToTop} className={styles.footer__NavigationButton}>
      <p className={styles.footer__Link}>{t('footer.backToTop')}</p>
      <div className={styles.footer__LinkIconContainer}>
        <ChevronUp className={styles.footer__LinkIcon} />
      </div>
    </div>
  );
}

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.footer__Container}>
      <div className={styles.footer__Body}>
        <div className={styles.footer__Logo}>
          <NavLink to="/">
            <img src="img/new/LogoDarkTheme.svg" alt="" />
          </NavLink>
        </div>
        <div className={styles.footer__Navigation}>
          <NavLink
            to="https://github.com/PaulKotsan/react_phone-catalog?tab=readme-ov-file"
            className={styles.footer__Link}
          >
            {t('footer.github')}
          </NavLink>
          <NavLink to="/contacts" className={styles.footer__Link}>
            {t('footer.contacts')}
          </NavLink>
          <NavLink to="/rights" className={styles.footer__Link}>
            {t('footer.rights')}
          </NavLink>
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};
