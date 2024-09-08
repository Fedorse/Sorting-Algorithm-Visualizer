import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import GitHubIcon from '../icon/GitHubIcon';
import InfoIcon from '../icon/InfoIcon';
import Modal from '../Modal/Modal';

import classes from './Navbar.module.css';
import LightThemeIcon from '../icon/LightThemeIcon';
import DarkThemeIcon from '../icon/DarkThemeIcon';

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
    <nav>
      <div className={classes.navContainer}>
        <Button onClick={toggleTheme} className={classes.navButton}>
          {theme === 'light' ? <DarkThemeIcon /> : <LightThemeIcon />}
        </Button>
        <div className={classes.buttonInfo}>
          <Button onClick={openModal} className={classes.navButton}>
            <InfoIcon />
          </Button>
          <a
            href="https://github.com/Fedorse/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className={classes.navButton}>
              <GitHubIcon />
            </Button>
          </a>
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </nav>
  );
};

export default Navbar;
