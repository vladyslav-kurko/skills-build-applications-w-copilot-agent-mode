import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Users from './components/Users';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="fas fa-leaf me-2"></i>Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="fas fa-users me-1"></i>Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="fas fa-running me-1"></i>Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="fas fa-people-arrows me-1"></i>Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="fas fa-dumbbell me-1"></i>Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="fas fa-trophy me-1"></i>Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-5">
                <div className="jumbotron">
                  <h1 className="display-4">
                    <i className="fas fa-heartbeat me-2"></i>Welcome to Octofit Tracker
                  </h1>
                  <p className="lead">
                    Your personal fitness companion for tracking activities, building teams, and competing with friends.
                  </p>
                  <hr className="my-4" />
                  <p>Track your fitness journey with real-time activity logging and leaderboard competition.</p>
                  <div className="mt-4">
                    <Link to="/users" className="btn btn-primary btn-lg me-2">
                      <i className="fas fa-users me-1"></i>View Users
                    </Link>
                    <Link to="/activities" className="btn btn-success btn-lg me-2">
                      <i className="fas fa-running me-1"></i>View Activities
                    </Link>
                    <Link to="/leaderboard" className="btn btn-warning btn-lg">
                      <i className="fas fa-trophy me-1"></i>View Leaderboard
                    </Link>
                  </div>
                </div>

                <div className="row mt-5 mb-5">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-header">
                        <i className="fas fa-running me-2"></i>Activities
                      </div>
                      <div className="card-body">
                        <p className="card-text">Track and log all your fitness activities with detailed metrics.</p>
                        <Link to="/activities" className="btn btn-outline-primary btn-sm">
                          Learn More <i className="fas fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-header">
                        <i className="fas fa-people-arrows me-2"></i>Teams
                      </div>
                      <div className="card-body">
                        <p className="card-text">Create and manage teams to compete and collaborate with friends.</p>
                        <Link to="/teams" className="btn btn-outline-primary btn-sm">
                          Learn More <i className="fas fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-header">
                        <i className="fas fa-trophy me-2"></i>Leaderboard
                      </div>
                      <div className="card-body">
                        <p className="card-text">Compete and see where you rank on the global fitness leaderboard.</p>
                        <Link to="/leaderboard" className="btn btn-outline-primary btn-sm">
                          Learn More <i className="fas fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
