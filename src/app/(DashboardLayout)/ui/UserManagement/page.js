'use client';

import { Nav, NavItem, NavLink, Container } from 'reactstrap';
import { usePathname, useRouter } from 'next/navigation';
import classnames from 'classnames';

export default function UserManagementLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (path) => {
    try {
      router.push(`/usermanagement/${path}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>User Management</h2>
      <Nav pills className="mb-4">
        <NavItem>
          <NavLink
            href="#"
            className={classnames({ active: pathname.includes('/list') })}
            onClick={() => handleNav('list')}
            role="button"
            aria-selected={pathname.includes('/list')}
          >
            User List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            className={classnames({ active: pathname.includes('/active') })}
            onClick={() => handleNav('active')}
            role="button"
            aria-selected={pathname.includes('/active')}
          >
            Active Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            className={classnames({ active: pathname.includes('/deactive') })}
            onClick={() => handleNav('deactive')}
            role="button"
            aria-selected={pathname.includes('/deactive')}
          >
            Deactive Users
          </NavLink>
        </NavItem>
      </Nav>
      {children}
    </Container>
  );
}