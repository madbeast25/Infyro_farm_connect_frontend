import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { FarmsPage } from './pages/FarmsPage';
import { FarmDetailPage } from './pages/FarmDetailPage';
import { FieldsPage } from './pages/FieldsPage';
import { CropPlantingsPage } from './pages/CropPlantingsPage';
import { ReportsPage } from './pages/ReportsPage';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/farms" element={<FarmsPage />} />
          <Route path="/farms/:farmId" element={<FarmDetailPage />} />
          <Route path="/farms/:farmId/fields" element={<FieldsPage />} />
          <Route path="/farms/:farmId/plantings" element={<CropPlantingsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
