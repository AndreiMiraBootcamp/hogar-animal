import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const { userData, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const userRole = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData')!).role
    : null;

  return (
    <header className={`text-black py-4 px-10 flex justify-around items-center transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white shadow-md`}>
      <div className="flex items-center">
        <Link to="/" className="block">
          <img src="./images/Logo.png" alt="Logo" className="h-9 object-contain" />
        </Link>
      </div>

      <nav className="hidden md:flex space-x-8">
        <Link to="/centers" className="text-lg text-gray-700 hover:text-gray-900">
          Refugios y Protectoras
        </Link>
        <Link to="/about" className="text-lg text-gray-700 hover:text-gray-900">
          Sobre Nosotros
        </Link>
        <Link to="/colabora" className="text-lg text-gray-700 hover:text-gray-900">
          Contacto
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        {!userData ? (
          <Link to="/login" className="p-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-800">
            Log In
          </Link>
        ) : (
          <>
            <IconButton onClick={handleMenuOpen}>
              <img
                src={`data:image/jpeg;base64,${userData.image}`}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profile" className="text-gray-700 hover:text-gray-900 w-full">Editar Perfil</Link>
              </MenuItem>
              {userRole === 'admin' && (
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/admin" className="text-gray-700 hover:text-gray-900 w-full">Panel de Administración</Link>
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  logout();
                  handleMenuClose();
                }}
              >
                Cerrar sesión
              </MenuItem>
            </Menu>
          </>
        )}
      </div>

      {/* Menú desplegable en dispositivos móviles */}
      <div className="md:hidden flex items-center">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
            <ListItem button component={Link} to="/centers" onClick={toggleDrawer(false)}>
              <ListItemText primary="Refugios y Protectoras" />
            </ListItem>
            <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
              <ListItemText primary="Sobre Nosotros" />
            </ListItem>
            <ListItem button component={Link} to="/colabora" onClick={toggleDrawer(false)}>
              <ListItemText primary="Contacto" />
            </ListItem>
            {userRole === 'admin' && (
              <ListItem button component={Link} to="/admin" onClick={toggleDrawer(false)}>
                <ListItemText primary="Panel de Administración" />
              </ListItem>
            )}
            {userData && (
              <ListItem button onClick={() => { logout(); toggleDrawer(false)(); }}>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;