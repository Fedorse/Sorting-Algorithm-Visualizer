import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import GitHubIcon from '../Icons/GitHubIcon';
import InfoIcon from '../Icons/InfoIcon';
import Modal from '../Modal/Modal';

import classes from './Navbar.module.css';
import LightThemeIcon from '../Icons/LightThemeIcon';
import DarkThemeIcon from '../Icons/DarkThemeIcon';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [theme, setTheme] = useState('light');

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    let newTheme;
    if (theme === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
  };
  return (
    <>
      <nav className={classes.navContainer}>
        <Button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className={classes.navButton}
        >
          {theme === 'light' ? <DarkThemeIcon /> : <LightThemeIcon />}
        </Button>
        <div className={classes.buttonInfo}>
          <Button
            aria-label="Info"
            onClick={openModal}
            className={classes.navButton}
          >
            <InfoIcon />
          </Button>
          <a
            href="https://github.com/Fedorse/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button aria-label="GitHub" className={classes.navButton}>
              <GitHubIcon />
            </Button>
          </a>
        </div>
      </nav>
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};

export default Navbar;
