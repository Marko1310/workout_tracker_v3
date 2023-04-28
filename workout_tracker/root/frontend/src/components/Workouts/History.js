// React
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import exererciseServices from '../../services/exerciseServices';
import trackServices from '../../services/trackServices';

// css
import './History.css';

// Context
import { GlobalContext } from '../../context/GlobalContext';

const History = ({ workout_id, exercise_id, exercise_name }) => {
  // global context
  const { currentWorkout } = useContext(GlobalContext);
  const { currentTrackData, setCurrentTrackData } = useContext(GlobalContext);
  const { setPrevTrackData } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);

  const { id } = useParams();

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    trackServices.getHistoryTrackData(workout_id, exercise_id).then((data) => {
      setHistoryData(data.data);
    });
  }, []);

  // if (historyData) {
  // console.log(historyData[0]);
  // }

  return (
    historyData.length > 0 && (
      <div className="history-container">
        <p className="history-exercise-title">{exercise_name}</p>
        {historyData.map((el) => {
          return (
            <div className="history-data-container">
              <div className="history-dayDate-container">
                <p className="history-day">{el.workout_day}</p>
                <p className="history-date">{el.trackdata_history[0].date.slice(0, 10)}</p>
              </div>
              <div className="history-setRepWeight-container">
                <p className="history-set">{el.trackdata_history[0].set}</p>
                <p className="history-rep">{el.trackdata_history[0].reps}</p>
                <p className="history-weight">{el.trackdata_history[0].weight}</p>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default History;
