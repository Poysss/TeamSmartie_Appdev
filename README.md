# TeamSmartie_Appdev

# SMARTIE - Interactive Flashcard Learning Platform

## About The Project
SMARTIE is an innovative web-based flashcard application designed to enhance the learning experience for students. The platform combines traditional flashcard study methods with interactive quiz modes and progress tracking to create an engaging and effective learning environment.

### Key Features:
The application helps students:
  * Create and organize study materials by subject and category
  *	Test their knowledge through interactive quizzes
  *	Track their learning progress over time
  *	Review and reinforce challenging concepts
  *	Manage study time efficiently

## Built With
Backend
  *	Java Spring Boot
  *	MySQL Database
  *	JPA/Hibernate
  *	Maven
  
Frontend
  *	React.js
  *	Vite
  *	Axios for API calls
  *	Recharts for data visualization
  *	Lucide React for icons
  *	Tailwind CSS for styling
  
## Getting Started

Follow these steps to set up SMARTIE locally on your machine.

### Prerequisites

Make sure you have the following installed:
  *	Node.js (v14 or higher)
  *	npm (comes with Node.js)
  *	Java JDK 17
  *	Maven
  *	MySQL
Installation
1. Clone the repository
      * git clone https://github.com/your_username/smartie.git
2.	Set up the backend
      * cd smartie/backend
      * mvn clean install
3.	Configure MySQL database
     
## Create a new database named 'smartie'
  mysql -u root -p
  CREATE DATABASE smartie;
  
4.	Update application.properties with your database credentials
     * spring.datasource.url=jdbc:mysql://localhost:3306/smartie
     * spring.datasource.username=your_username
     * spring.datasource.password=your_password
5.	Install frontend dependencies
     * cd ../frontend
     * npm install
6.	Start the application

# Start backend (from backend directory)
  mvn spring-boot:run

# Start frontend (from frontend directory)
  npm run dev
  
## Usage
  
1.	Creating an Account 
  *	Register with your email and password
  *	Fill in your basic information
2.	Creating Flashcards 
  *	Click "Create New Deck"
  *	Enter subject and category
  *	Add questions and answers
  *	Save your flashcard deck
3.	Study Mode 
  *	Select a flashcard deck
  *	Click "Study" to review cards
  *	Flip cards to reveal answers
  *	Mark cards as mastered or needs review
4.	Quiz Mode 
  *	Choose a flashcard deck
  *	Select difficulty level
  *	Complete timed quizzes
  *	Review your answers
5.	Progress Tracking 
  *	View performance statistics
  *	Track improvement over time
  *	Identify areas needing more focus
  *	Review past quiz results

### Roadmap

  * Improve user interface with more intuitive navigation and design
  * Make it easier to organize flashcards into different subjects and topics
  * Create personalized study recommendations based on user performance
  * Build a feature that shows students their learning progress over time
  * Add a feature that helps students quickly find and review their weak spots
  * Help students remember things better with a study system that knows when to show tricky cards
  * Make our study quizzes smarter by tracking how students learn and improve
  
## Database Schema

The database schema includes the following main entities:
*	Student: Stores user information and authentication details
*	FlashCard: Contains deck information and organization
*	QuizMode: Manages quiz configurations and results
*	Review: Tracks incorrect answers and learning progress
*	TrackProgress: Monitors overall student performance
*	FlashCardContent: Stores individual card content
  
Each entity is carefully designed to support the application's core functionalities while maintaining data integrity and enabling efficient querying.

![image](https://github.com/user-attachments/assets/acd4cf0d-4546-439a-9a32-af2175345dc1)


  
### Contributing

  Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
1.	Fork the Project
2.	Create your Feature Branch (git checkout -b feature/AmazingFeature)
3.	Commit your Changes (git commit -m 'Add some AmazingFeature')
4.	Push to the Branch (git push origin feature/AmazingFeature)
5.	Open a Pull Request
   
## The Team

### MEMBERS:
 * Jake Luis E. Lood\
 * Spencer Z. Nacario\
 * Francis B. Yap\
 * Jude Anthony L. Bagarinao\

# Contact
  * jakeluis.lood@cit.edu
  * spencer.nacario@cit.edu
  * francisnino.yap@cit.edu
  * judeanthony.bagarinao@cit.edu
  
