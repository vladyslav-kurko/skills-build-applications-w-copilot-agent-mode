import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/workouts/`;
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="fas fa-dumbbell me-2"></i>Workouts
          </h2>

          {loading && (
            <div className="alert alert-info" role="alert">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading workouts...
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && workouts.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🏋️</div>
              <p className="text-muted">No workouts found</p>
            </div>
          )}

          {!loading && !error && workouts.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Intensity</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <strong>{workout.name || 'N/A'}</strong>
                      </td>
                      <td>
                        <span className="badge bg-primary">{workout.type || 'N/A'}</span>
                      </td>
                      <td>{workout.duration || 'N/A'}</td>
                      <td>
                        {workout.intensity === 'high' && <span className="badge bg-danger">High</span>}
                        {workout.intensity === 'medium' && <span className="badge bg-warning">Medium</span>}
                        {workout.intensity === 'low' && <span className="badge bg-info">Low</span>}
                        {!['high', 'medium', 'low'].includes(workout.intensity) && (
                          <span className="badge bg-secondary">{workout.intensity || 'N/A'}</span>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {workout.created_at ? new Date(workout.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
