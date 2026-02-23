/* eslint-disable max-len */
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/index';
import { CatalogPage } from './modules/Catalog/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog/:type" element={<CatalogPage />} />
        <Route path="/:category/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />

        <Route path="*" element={<img src="/img/page-not-found.png" />} />
      </Route>
    </Routes>
  </HashRouter>
);
