
import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="#">JobBoard</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Post a Job</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
