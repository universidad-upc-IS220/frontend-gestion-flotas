import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home/index';
import { ChoferesPage } from '../pages/Choferes/index';
import { PapeletaPage } from '../pages/Papeleta/index';
// import { VisualizarTasasPage } from '../pages/VisualizarTasas';
// import { ModificarTasasPage } from '../pages/ModificarTasas';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/choferes" element={<ChoferesPage />} />
      <Route path="/papeleta" element={<PapeletaPage />} />
      {/* <Route path="/modificar-tasas" element={<ModificarTasasPage />} /> */}
    </Routes>
  );
};
