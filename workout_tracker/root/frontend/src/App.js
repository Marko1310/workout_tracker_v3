// React
import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// css
import './index.css';

// Components
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Workout from './components/Workouts/Workout';
import SplitGrid from './components/Splits/SplitGrid';
import WorkoutGrid from './components/Workouts/WorkoutGrid';
import NotFound from './components/NotFound/NotFound';

// Context
import { GlobalContext } from './context/GlobalContext';

function App() {
  const { setIsModalOpen, setIsMenuOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/splits');
    setIsModalOpen(false);
    setIsMenuOpen(false);
  }, [user]);

  return (
    <div className="App">
      <div className="content">
        {user && <Navigation />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="splits" element={<SplitGrid />} />
          <Route path="splits/:split_id/" element={<WorkoutGrid />} />
          <Route path="splits/:split_id/workouts/:id" element={<Workout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
