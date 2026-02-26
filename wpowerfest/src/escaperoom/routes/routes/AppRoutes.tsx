import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchUserPage } from '../pages/SearchUserPage';
import { ResendQRPage } from '../pages/ResendQRPage';
import { TriviaPage } from '../pages/TriviaPage';
import { TimeslotSelectionPage } from '../pages/TimeslotSelectionPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { AdminPage } from '../pages/AdminPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/search" element={<SearchUserPage />} />
          <Route path="/resend-qr" element={<ResendQRPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route path="/select-timeslot" element={<TimeslotSelectionPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
