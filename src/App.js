import { Dashboard, Home } from '@mui/icons-material';
import './App.css';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import CoinPage from './pages/Coin';
import ComparePage from './pages/ComparePage';
import WatchlistPage from './pages/Watchlist';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Footer from "./components/Common/Footer/footer";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<HomePage/>} />
          <Route path = "/dashboard" element = {<DashboardPage/>} />
          <Route path = "/coin/:id" element = {<CoinPage/>} />
          <Route path = "/compare" element = {<ComparePage/>} />
          <Route path = "/watchlist" element = {<WatchlistPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
