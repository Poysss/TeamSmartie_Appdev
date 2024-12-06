export const API_ENDPOINTS = {
  // Student endpoints
  STUDENT: {
    LOGIN: '/student/login',
    REGISTER: '/student/add',
    UPDATE: '/student/update',
    DELETE: '/student/delete',
    GET_ALL: '/student/get'
  },

  // Flashcard endpoints
  FLASHCARD: {
    GET_ALL: '/flashcard/get',
    CREATE: '/flashcard/add',
    UPDATE: '/flashcard/update',
    DELETE: '/flashcard/delete'
  },

  // FlashCard Content endpoints
  CONTENT: {
    GET_ALL: '/content/get',
    CREATE: '/content/add',
    UPDATE: '/content/update',
    DELETE: '/content/delete'
  },

  // Quiz endpoints
  QUIZ: {
    GET_ALL: '/quiz/get',
    CREATE: '/quiz/add',
    UPDATE: '/quiz/update',
    DELETE: '/quiz/delete'
  },

  // Review endpoints
  REVIEW: {
    GET_ALL: '/review/get',
    CREATE: '/review/add',
    UPDATE: '/review/update',
    DELETE: '/review/delete'
  },

  // Progress endpoints
  PROGRESS: {
    GET_ALL: '/progress/get',
    CREATE: '/progress/add',
    UPDATE: '/progress/update',
    DELETE: '/progress/delete'
  }
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  FLASHCARDS: '/flashcards',
  QUIZ: '/quiz',
  REVIEW: '/review',
  PROGRESS: '/progress'
};

export const QUIZ_CONSTANTS = {
  DIFFICULTY_LEVELS: {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD'
  },

  TIME_LIMITS: {
    EASY: 600,    // 10 minutes
    MEDIUM: 300,  // 5 minutes
    HARD: 180     // 3 minutes
  },

  MIN_PASS_SCORE: 60
};

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  THEME: 'theme'
};

export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Invalid username or password',
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  QUIZ_LOAD_ERROR: 'Failed to load quiz. Please try again.',
  QUIZ_SUBMIT_ERROR: 'Failed to submit quiz. Please try again.',
  NO_CONTENT: 'No content available for this quiz.'
};

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};