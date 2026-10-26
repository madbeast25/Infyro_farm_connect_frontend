import { Link, NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Tractor, LogOut, Sprout, BarChart3, FolderKanban } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/farms', label: 'Farms', icon: Tractor },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
];

export function Layout() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f7f2' }}>
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 240,
          height: '100vh',
          background: '#173d2a',
          color: '#fff',
          padding: '24px 18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: '#2d7c52',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Sprout size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>Infyro</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Farm Connect</div>
          </div>
        </div>

        <nav style={{ display: 'grid', gap: 8 }}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 12,
                background: isActive ? '#254f24' : 'transparent',
                color: '#fff',
                fontWeight: 600,
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 24, padding: '8px 4px', color: '#d9eadb', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Pages
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <Link
            to="/farms/1/fields"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              borderRadius: 12,
              color: '#fff',
              opacity: 0.9,
            }}
          >
            <FolderKanban size={18} />
            Fields
          </Link>
          <Link
            to="/farms/1/plantings"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              borderRadius: 12,
              color: '#fff',
              opacity: 0.9,
            }}
          >
            <Tractor size={18} />
            Plantings
          </Link>
        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 12,
            background: 'transparent',
            color: '#fff',
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main style={{ marginLeft: 240, padding: '32px 32px 48px' }}>
        <Outlet />
      </main>
    </div>
  );
}
