import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </BrowserRouter>
  );
}