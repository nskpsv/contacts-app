import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Auth from './pages/auth/Auth';
import ContactsList from './pages/contacts-list/contacts-list';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ContactsList />} />
      <Route path='login' element={<Auth />} />
    </Routes>
  )
}

export default App;
