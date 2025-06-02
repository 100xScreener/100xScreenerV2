import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import HomePage from '@/pages/HomePage';
import PumpScopePage from '@/pages/PumpScopePage';
import KolScannerPage from '@/pages/KolScannerPage';
import XScannerPage from '@/pages/XScannerPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-foreground">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pumpscope" element={<PumpScopePage />} />
              <Route path="/kolscanner" element={<KolScannerPage />} />
              <Route path="/xscanner" element={<XScannerPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;