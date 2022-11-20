import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/Auth';
import Contacts from './pages/contacts/contacts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Contacts />} />
      <Route path="login" element={<Auth />} />
    </Routes>
  );
}

export default App;
