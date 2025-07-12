//Css

import styles from './TopBar.module.css';

//Hooks

import { useState } from 'react';

//Ícons

import { FaRegBell, FaSearch } from 'react-icons/fa';

const TopBar = () => {
  const [search, setSearch] = useState('');
  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch size={14} color="#ccc" />
      </div>
      <div>
        <FaRegBell size={24} color="#555" />
      </div>
    </header>
  );
};

export default TopBar;
