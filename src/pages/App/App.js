import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import styles from './App.module.scss'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import AllListsPage from '../AllListsPage/AllListsPage'
import CurrentListPage from '../CurrentListPage/CurrentListPage'
import WordSearchPage from '../WordSearchPage/WordSearchPage'

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main>
      { user ?
        <>
          <Routes>
            {/* client-side route that renders the component instance if the path matches the url in the address bar */}
            <Route path="/search" element={<WordSearchPage user={user} setUser={setUser} />} />
            <Route path="/current" element={<CurrentListPage user={user} setUser={setUser} />} />
            <Route path="/lists" element={<AllListsPage user={user} setUser={setUser} />} />
            {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/search-word" />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}