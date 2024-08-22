import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el AuthContext
import SearchBar from './SearchBar';
import { Menu, MenuItem, IconButton } from '@mui/material'; // Importa los componentes de MUI

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userData, logout } = useAuth(); // Usa el contexto para obtener los datos de usuario y la función de logout
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Manejador del menú

  const handleSearch = (query: string) => {
    navigate(`/search?q=${query}`);
  };

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
    setAnchorEl(event.currentTarget); // Establece la posición del menú
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Cierra el menú
  };

  return (
    <header
      className={`text-black p-4 flex justify-between items-center transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } bg-white shadow-md`}
    >
      <div className="flex items-center space-x-4">
        <Link to="/" className="block items-center">
          <img src="./images/Logo.png" alt="Logo" className="h-9" />
        </Link>
      </div>

      <nav className="flex space-x-8">
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
        <SearchBar onSearch={handleSearch} />
        {!userData ? (
          <Link
            to="/login"
            className="p-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            Log In
          </Link>
        ) : (
          <>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                padding: 0, // Eliminar padding extra que añade MUI
                '&:hover': {
                  backgroundColor: 'transparent', // Eliminar cualquier efecto de hover
                },
              }}
            >
              <img
                src={`data:image/jpeg;base64,${userData.image}`}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  width: '200px',
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profile" className="text-gray-700 hover:text-gray-900 w-full">
                  Editar Perfil
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
