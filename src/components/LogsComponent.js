import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../res/styles/LogsComponent.css'; // Import the CSS file

const LogsComponent = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('https://localhost:7113/api/RuleChains/logs'); // Update with your backend endpoint
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="logs-container">
      <h2>Logs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Is Alarm</th>
            <th>Alarm ID</th>
            <th>Asset ID</th>
            <th>Device ID</th>
            <th>Email Content</th>
            <th>Email Recipient</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.isAlarm ? 'Yes' : 'No'}</td>
              <td>{log.alarmId}</td>
              <td>{log.assetId}</td>
              <td>{log.deviceId}</td>
              <td>{log.emailContent}</td>
              <td>{log.emailRecipient}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LogsComponent;
