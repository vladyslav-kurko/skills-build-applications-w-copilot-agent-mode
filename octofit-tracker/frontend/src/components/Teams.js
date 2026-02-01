import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/teams/`;
        
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="fas fa-people-arrows me-2"></i>Teams
          </h2>

          {loading && (
            <div className="alert alert-info" role="alert">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading teams...
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && teams.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">👨‍👩‍👧‍👦</div>
              <p className="text-muted">No teams found</p>
            </div>
          )}

          {!loading && !error && teams.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <strong>{team.name || 'N/A'}</strong>
                      </td>
                      <td>{team.description || 'N/A'}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
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

export default Teams;
