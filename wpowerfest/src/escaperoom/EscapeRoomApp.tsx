import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { RegisterPage } from './pages/RegisterPage';
import { SearchUserPage } from './pages/SearchUserPage';
import { ResendQRPage } from './pages/ResendQRPage';
import { TriviaPage } from './pages/TriviaPage';
import { TimeslotSelectionPage } from './pages/TimeslotSelectionPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AdminPage } from './pages/AdminPage';
import './styles/escaperoom.css';

export const EscapeRoomApp = () => {
  return (
    <div className="escaperoom-wrapper">
      <MainLayout>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/search" element={<SearchUserPage />} />
          <Route path="/resend-qr" element={<ResendQRPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route path="/select-timeslot" element={<TimeslotSelectionPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/escaperoom" replace />} />
        </Routes>
      </MainLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};
