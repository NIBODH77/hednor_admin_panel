
import React, { useState } from "react";
import { Button, Nav, NavItem, Collapse } from "reactstrap";
import Logo from "../../shared/logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Alert",
    href: "/ui/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "productmanagement",
    href: "/ui/productmanagement",
    icon: "bi bi-patch-check",
  },

  {
    title: "bulkproductmanagement",
    href: "/ui/bulkproductmanagement",
    icon: "bi bi-patch-check",
  },

  {
    title: "UserManagement",
    icon: "bi bi-card-text",
    children: [
      { title: "UserList", href: "/ui/UserManagement/UserList" },
      { title: "ActiveUser", href: "/ui/UserManagement/ActiveUser" },
      { title: "DeactiveUser", href: "/ui/UserManagement/DeactiveUser" },
    ],
  },
  {
    title: "ordermanagement",
    href: "/ui/ordermanagement",
    icon: "bi bi-columns",
  },
  {
    title: "ViewUserList",
    href: "/ui/ViewUserList",
    icon: "bi bi-layout-split",
  },
  {
    title: "salegraph",
    href: "/ui/salegraph",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/ui/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/pages/about",
    icon: "bi bi-people",
  },
];

const Sidebar = ({ showMobilemenu }) => {
  const location = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div 
  className="p-3" 
  style={{ 
    height: "100vh",
    position: "sticky",
    top: 0,
    left: 0,
    overflowY: "auto"
  }}
>
  <div className="d-flex align-items-center">
    <Logo />
    <span className="ms-auto d-lg-none">
      <Button close size="sm" onClick={showMobilemenu}></Button>
    </span>
  </div>
  <div className="pt-4 mt-2">
    <Nav vertical className="sidebarNav">
      {navigation.map((navi, index) => (
        <div key={index}>
          <NavItem className="sidenav-bg">
            {navi.children ? (
              <div
                className={
                  openDropdown === index
                    ? "nav-link text-primary py-3 d-flex justify-content-between align-items-center"
                    : "nav-link text-secondary py-3 d-flex justify-content-between align-items-center"
                }
                onClick={() => toggleDropdown(index)}
                style={{ cursor: "pointer" }}
              >
                <span>
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </span>
                <i className="bi bi-chevron-down"></i>
              </div>
            ) : (
              <Link
                href={navi.href}
                className={
                  location === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            )}
          </NavItem>
          {navi.children && (
            <Collapse isOpen={openDropdown === index} className="ps-4">
              {navi.children.map((child, idx) => (
                <NavItem key={idx}>
                  <Link
                    href={child.href}
                    className={
                      location === child.href
                        ? "text-primary nav-link py-2"
                        : "nav-link text-secondary py-2"
                    }
                  >
                    {child.title}
                  </Link>
                </NavItem>
              ))}
            </Collapse>
          )}
        </div>
      ))}
    </Nav>
  </div>
</div>
  );
};

export default Sidebar;



