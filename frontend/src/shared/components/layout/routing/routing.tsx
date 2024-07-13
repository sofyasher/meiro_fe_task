import React from 'react';
import { routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import Home from '../../../../pages/home/home';
import AttributeDetail from '../../../../pages/attribute-detail/attribute-detail';
import NotFound from '../../../../pages/not-found/not-found';
import AttributeListPage from '../../../../pages/attribute-list-page/attribute-list-page';

const Routing = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.attributes} element={<AttributeListPage />} />
      <Route path={`${routes.attributes}/:id`} element={<AttributeDetail />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
