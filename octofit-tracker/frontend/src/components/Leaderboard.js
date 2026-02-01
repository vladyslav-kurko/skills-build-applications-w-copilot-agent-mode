import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/leaderboards/`;
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="fas fa-trophy me-2"></i>Leaderboard
          </h2>

          {loading && (
            <div className="alert alert-info" role="alert">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading leaderboard...
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && leaderboard.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🏆</div>
              <p className="text-muted">No leaderboard data found</p>
            </div>
          )}

          {!loading && !error && leaderboard.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td>
                        {index === 0 ? (
                          <span className="badge bg-warning">🥇</span>
                        ) : index === 1 ? (
                          <span className="badge bg-secondary">🥈</span>
                        ) : index === 2 ? (
                          <span className="badge bg-danger">🥉</span>
                        ) : (
                          <span className="badge bg-light text-dark">{index + 1}</span>
                        )}
                      </td>
                      <th scope="row">{entry.id}</th>
                      <td>
                        <strong>{entry.name || 'N/A'}</strong>
                      </td>
                      <td>
                        <span className="badge bg-primary">{entry.score || 'N/A'}</span>
                      </td>
                      <td>
                        <span className="badge bg-success">{entry.points || 'N/A'}</span>
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

export default Leaderboard;
