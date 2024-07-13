import React from 'react';
import { routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import Home from '../../../../pages/home/home';
import AttributeList from '../../../../pages/attribute-list/attribute-list';
import AttributeDetail from '../../../../pages/attribute-detail/attribute-detail';
import NotFound from '../../../../pages/not-found/not-found';

const Routing = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.attributes} element={<AttributeList />} />
      <Route path={`${routes.attributes}/:id`} element={<AttributeDetail />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
