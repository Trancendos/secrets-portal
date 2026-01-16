import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Callback from '@/pages/Callback';
import { useAppStore } from '@/store/appStore';
import { getStoredToken } from '@/services/auth';
import Layout from '@/components/Layout';

function App() {
  const { token, setToken } = useAppStore();

  useEffect(() => {
    const stored = getStoredToken();
    if (stored) {
      setToken(stored);
    }
  }, [setToken]);

  return (
    <Router basename="/secrets-portal">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/"
          element={token ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;