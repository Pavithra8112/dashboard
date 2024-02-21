// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch upcoming events
    axios.get('http://localhost:3001/upcoming-events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching upcoming events:', error));

    // Fetch leave balance
    axios.get('http://localhost:3001/leave-balance')
      .then(response => setLeaveBalance(response.data.balance))
      .catch(error => console.error('Error fetching leave balance:', error));

    // Fetch announcements
    axios.get('http://localhost:3001/announcements')
      .then(response => setAnnouncements(response.data))
      .catch(error => console.error('Error fetching announcements:', error));
  }, [setEvents, setLeaveBalance, setAnnouncements]); // Include the state-setting functions in the dependency array

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <h3>Upcoming Events</h3>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.title} - {event.date}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Leave Balance</h3>
        <p>{leaveBalance} days</p>
      </div>

      <div>
        <h3>Announcements</h3>
        <ul>
          {announcements.map(announcement => (
            <li key={announcement.id}>{announcement.message}</li>
          ))}
        </ul>
      </div>

      <div>
        <Link to="/personal-details">View and Update Personal Details</Link>
      </div>

      <div>
        <Link to="/payroll-information">View Payroll Information</Link>
      </div>

      <div>
        <Link to="/document-repository">Access Document Repository</Link>
      </div>
    </div>
  );
};

export default Dashboard;
