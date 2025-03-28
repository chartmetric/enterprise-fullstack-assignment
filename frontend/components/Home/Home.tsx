import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { useState } from 'react';
import api from '../../utils/api';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace this with your API
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getData();
        setData(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.main}>
        <h1>🎵 Chartmetric Artist Performance Dashboard</h1>
        <p>
          This is the main page for your assignment. Start building from here!
        </p>

        {/* Summary Section */}
        <div className={styles.summary}>
          <h3>Summary KPIs</h3>
          {/* TODO: Render summary numbers here */}
        </div>

        {/* Charts Section */}
        <div className={styles.charts}>
          <h3>Performance Chart</h3>
          {/* TODO: Render LineChart, BarChart and other charts using any chart library */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
