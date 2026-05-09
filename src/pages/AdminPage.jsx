import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLoginScreen from '../components/AdminLoginScreen.jsx';
import AdminOverviewScreen from '../components/AdminOverviewScreen.jsx';

function AdminPage() {
  const location = useLocation();
  const forceLoginView = new URLSearchParams(location.search).get('view') === 'login';
  const [auth, setAuth] = useState(forceLoginView ? 'login' : 'checking');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadAdminData() {
    setLoading(true);

    try {
      const response = await fetch('/api/admin-data', { credentials: 'include' });
      if (response.status === 401) {
        setData(null);
        setAuth('login');
        return false;
      }

      if (!response.ok) {
        setData(null);
        setAuth('login');
        return false;
      }

      const payload = await response.json();
      setData(payload);
      setAuth('ok');
      return true;
    } catch {
      setData(null);
      setAuth('login');
      return false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (forceLoginView) {
      setAuth('login');
      return;
    }

    loadAdminData();
  }, [forceLoginView]);

  async function handleAuthenticated() {
    return loadAdminData();
  }

  async function handleLogout() {
    await fetch('/api/admin-logout', { method: 'POST', credentials: 'include' });
    setData(null);
    setAuth('login');
  }

  if (auth === 'checking' || loading) {
    return <div className="py-20 text-center text-slate-500">Carregando area administrativa...</div>;
  }

  if (auth === 'login') {
    return <AdminLoginScreen onAuthenticated={handleAuthenticated} />;
  }

  if (!data) {
    return <div className="py-20 text-center text-red-300">Nao foi possivel carregar o painel.</div>;
  }

  return <AdminOverviewScreen data={data} onLogout={handleLogout} />;
}

export default AdminPage;
