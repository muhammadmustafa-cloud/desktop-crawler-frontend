import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import MarketIntelligencePage from './pages/MarketIntelligencePage';
import MainDashboardPage from './pages/MainDashboardPage';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pharma-app-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="intelligence" element={<MarketIntelligencePage />} />
            <Route index element={<MainDashboardPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
