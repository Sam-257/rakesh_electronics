import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import AdminLayout from './components/AdminLayout/AdminLayout';
import EditorPage from './pages/Admin/EditorPage/EditorPage';
import { useTheme } from './hooks/useTheme';

const App = () => {
  useTheme();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="hero" replace />} />
        <Route path=":section" element={<EditorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
