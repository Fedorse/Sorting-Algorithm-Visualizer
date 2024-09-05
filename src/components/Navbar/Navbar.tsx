import Button from '../Button/Button';
import GitHubIcon from '../icon/GitHubIcon';
import InfoIcon from '../icon/InfoIcon';
import Modal from '../Modal/Modal';

import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav>
      <div className={classes.navContainer}>
        <a
          href="https://github.com/Fedorse/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className={classes.navButton}>
            <GitHubIcon />
          </Button>
        </a>
        <Button className={classes.navButton}>
          <InfoIcon />
        </Button>
      </div>
      <Modal  />
    </nav>
  );
};

export default Navbar;
