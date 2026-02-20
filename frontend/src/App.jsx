import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';

// Halaman Dashboard Admin
import AntrianPage from './pages/Dashboard/AntrianPage/AntrianPage';
import QRCodePage from './pages/Dashboard/QRCodePage/QRCodePage';
import PendapatanPage from './pages/Dashboard/PendapatanPage/PendapatanPage';
import LayananPage from './pages/Dashboard/LayananPage/LayananPage';
import TambahLayanan from './pages/Dashboard/LayananPage/TambahLayanan';

// Halaman Customer
import BookingPage from './pages/Customer/BookingPage';
import BookingSuccess from './pages/Customer/BookingSuccess';
import PaymentPage from './pages/Customer/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. HALAMAN LOGIN ADMIN */}
        <Route path="/" element={<Login />} />

        {/* 2. KELOMPOK HALAMAN ADMIN (Pake Sidebar/DashboardLayout) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
           <Route index element={<AntrianPage />} /> 
           <Route path="qrcode" element={<QRCodePage />} />
           <Route path="pendapatan" element={<PendapatanPage />} />
           <Route path="layanan" element={<LayananPage />} />
           <Route path="layanan/tambah" element={<TambahLayanan />} />
           {/* JANGAN masukkan rute booking di sini */}
        </Route>

        {/* 3. KELOMPOK HALAMAN CUSTOMER (Tanpa Sidebar/Bersih) */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/payment" element={<PaymentPage />} />
        <Route path="/booking/success" element={<BookingSuccess />} />

      </Routes>
    </Router>
  );
}

export default App;