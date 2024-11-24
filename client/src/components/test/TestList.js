import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/TestList.css';
import '../../styles/Loading.css';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/tests');
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">Loading tests...</p>
      </div>
    );
  }

  return (
    <div className="test-list-container">
      <div className="test-list-header">
        <h1>Reading Comprehension Tests</h1>
        <p>Enhance your reading skills with our collection of tests</p>
      </div>

      <div className="test-grid">
        {tests.map((test, index) => (
          <div 
            key={test._id} 
            className="test-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="category-tag">{test.category}</span>
            
            <div className="test-card-header">
              <h3>{test.title}</h3>
            </div>

            <div className="test-card-body">
              <div className="test-info">
                <div className="test-info-item">
                  <i className="far fa-clock"></i>
                  <span>{test.timeLimit} minutes</span>
                </div>
                <div className="test-info-item">
                  <i className="fas fa-tasks"></i>
                  <span className={`difficulty-badge difficulty-${test.difficulty.toLowerCase()}`}>
                    {test.difficulty}
                  </span>
                </div>
                <div className="test-info-item">
                  <i className="far fa-question-circle"></i>
                  <span>{test.questions?.length || 0} Questions</span>
                </div>
              </div>

              <button 
                className="start-test-btn"
                onClick={() => navigate(`/test/${test._id}`)}
              >
                <i className="fas fa-play"></i>
                Start Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestList;