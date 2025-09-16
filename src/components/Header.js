import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="container header-content">
        <Link href="/" className="logo" aria-label="Bun Shop home">
          <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Bun Shop</span>
        </Link>

        <nav className="nav-links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={router.pathname === link.href ? 'active' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="auth-actions">
          {user ? (
            <>
              <span style={{ fontWeight: 500 }}>Hi, {user.name}</span>
              {user.role === 'admin' ? (
                <Link className="btn btn-outline" href="/admin">
                  Admin
                </Link>
              ) : null}
              <button type="button" className="btn btn-text" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline" href="/login">
                Login
              </Link>
              <Link className="btn btn-primary" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
