import React, { useState, useEffect } from 'react';
import { 
  Award, 
  TrendingUp, 
  Clock, 
  Brain,
  AlertTriangle,
  Loader,
  BookOpen
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import quizService from '../../services/quiz.service';
import './Progress.css';

const Progress = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0
  });
  const [subjectStats, setSubjectStats] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        throw new Error('User not authenticated');
      }

      // Get user's quizzes
      const quizzes = await quizService.getQuizzesByStudent(userData.studentId);

      // Calculate overall stats
      const overallStats = calculateOverallStats(quizzes);
      setStats(overallStats);

      // Calculate subject-wise stats
      const subjectWiseStats = calculateSubjectStats(quizzes);
      setSubjectStats(subjectWiseStats);

      // Get recent quizzes
      const recent = quizzes
        .map(quiz => ({
          ...quiz,
          createdAt: quiz.createdAt || new Date().toISOString()
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentQuizzes(recent);

      // Prepare performance data for chart
      const performanceHistory = preparePerformanceData(quizzes);
      setPerformanceData(performanceHistory);

    } catch (err) {
      console.error('Error loading progress:', err);
      setError(err.message || 'Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallStats = (quizzes) => {
    if (!quizzes.length) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalTime: 0
      };
    }

    const scores = quizzes.map(quiz => quiz.score || 0);
    const times = quizzes.map(quiz => quiz.timeSpent || 0);

    return {
      totalQuizzes: quizzes.length,
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      bestScore: Math.max(...scores),
      totalTime: times.reduce((a, b) => a + b, 0)
    };
  };

  const calculateSubjectStats = (quizzes) => {
    const subjectMap = new Map();

    quizzes.forEach(quiz => {
      const subject = quiz.flashCard?.subject || 'Unknown';
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, {
          subject,
          quizCount: 0,
          totalScore: 0,
          bestScore: 0,
          totalTime: 0,
          lastAttempted: null
        });
      }

      const stats = subjectMap.get(subject);
      stats.quizCount++;
      stats.totalScore += quiz.score || 0;
      stats.bestScore = Math.max(stats.bestScore, quiz.score || 0);
      stats.totalTime += quiz.timeSpent || 0;
      
      const quizDate = quiz.createdAt ? new Date(quiz.createdAt) : new Date();
      if (!stats.lastAttempted || quizDate > new Date(stats.lastAttempted)) {
        stats.lastAttempted = quizDate;
      }
    });

    return Array.from(subjectMap.values())
      .map(stats => ({
        ...stats,
        averageScore: Math.round(stats.totalScore / stats.quizCount)
      }))
      .sort((a, b) => b.averageScore - a.averageScore);
  };

  const preparePerformanceData = (quizzes) => {
    return quizzes
      .map(quiz => ({
        ...quiz,
        createdAt: quiz.createdAt || new Date().toISOString()
      }))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-10)
      .map(quiz => ({
        name: formatDate(quiz.createdAt, true),
        score: quiz.score,
        subject: quiz.flashCard?.subject
      }));
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) {
      return '0m';
    }
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString, shortFormat = false) => {
    try {
      const date = new Date(dateString);
      if (shortFormat) {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="progress-loading">
        <Loader className="animate-spin" size={24} />
        <span>Loading progress data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <AlertTriangle size={20} />
        {error}
      </div>
    );
  }

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h1>Learning Progress</h1>
        <p>Track your learning journey and achievements</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Brain size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.totalQuizzes}</span>
            <span className="stat-label">Quizzes Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.bestScore}%</span>
            <span className="stat-label">Best Score</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.averageScore}%</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{formatTime(stats.totalTime)}</span>
            <span className="stat-label">Total Study Time</span>
          </div>
        </div>
      </div>

      <div className="performance-chart">
        <h2>Performance History</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.7)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(25, 29, 136, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#FFC436" 
                strokeWidth={2}
                dot={{ fill: '#FFC436' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="subjects-section">
        <h2>Performance by Subject</h2>
        <div className="subjects-grid">
          {subjectStats.map(subject => (
            <div key={subject.subject} className="subject-card">
              <div className="subject-header">
                <BookOpen className="subject-icon" />
                <h3>{subject.subject}</h3>
              </div>
              <div className="subject-stats">
                <div className="subject-stat">
                  <span className="stat-label">Average Score</span>
                  <span className="stat-value">{subject.averageScore}%</span>
                </div>
                <div className="subject-stat">
                  <span className="stat-label">Best Score</span>
                  <span className="stat-value">{subject.bestScore}%</span>
                </div>
                <div className="subject-stat">
                  <span className="stat-label">Quizzes Taken</span>
                  <span className="stat-value">{subject.quizCount}</span>
                </div>
                <div className="subject-stat">
                  <span className="stat-label">Time Spent</span>
                  <span className="stat-value">{formatTime(subject.totalTime)}</span>
                </div>
              </div>
              {subject.lastAttempted && (
                <div className="last-attempted">
                  Last attempted: {formatDate(subject.lastAttempted)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Quizzes</h2>
        <div className="activity-list">
          {recentQuizzes.map(quiz => (
            <div key={quiz.quizModeId} className="activity-card">
              <div className="activity-info">
                <h4>{quiz.flashCard?.subject}</h4>
                <span className="activity-date">
                  {formatDate(quiz.createdAt)}
                </span>
              </div>
              <div className="activity-score">
                <span className="score-value">{quiz.score}%</span>
                <span className="time-value">{formatTime(quiz.timeSpent)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;