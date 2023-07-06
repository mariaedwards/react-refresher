import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';

function Nav() {
  return (
    <nav className={classes.header}>
      <ul className={classes.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end>
            HOME
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }>
            PRODUCTS
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
