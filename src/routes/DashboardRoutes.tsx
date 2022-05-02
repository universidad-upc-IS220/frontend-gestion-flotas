import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home/index';
import { ModificarTasaPage } from '../pages/ModificarTasas';
import { ChoferesPage } from '../pages/Choferes';
import { UnidadesPage } from '../pages/Unidades';

// Providers
import { ModificarTasaProvider } from '../pages/ModificarTasas/contexts/ModificarTasaProvider';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<UnidadesPage />} />
      <Route path="/choferes" element={<ChoferesPage />} />
    </Routes>
  );
};
