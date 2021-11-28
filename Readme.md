**Scheduler** 
- Allows students to submit weekly preferences for attending class in-person or remotely.
- The tool assigns available seats to students who want to physically attend class.
- Provides the faculty with a roster of who has been cleared to attend.

- [Features](#features)

## Features
   Add to Base URL above

- Use the following Endpoints

    `POST /signup` Create User Account

    `POST /admin` Login An Admin

    `POST /student` Login A Student

    `POST /faculty` Login A Faculty

    `POST/forgot-password` Reset Password
	
    `POST/addpreference` Submit a preference
     
    `GET /student/dashboard/:user_id` Get all Preferences

    `DELETE /student/dashboard` Delete a preference

    `GET /admin/dashboard/:classname` Get All Seats


## Browser Support
- **Firefox**:	version 4 and up
- **Chrome**:	any version
- **Safari**:	version 5.2 and up
- **Internet Explorer/Edge**:	version 8 and up
- **Opera**:	version 9 and up

## Technology Stack to be used:

<img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/> 
<img src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/>


- **Frontend**: ReactJS, HTML ,CSS ,Javascript ,Material UI
- **Backend**: NodeJs
- **IDE**: VS Code
- **API Testing & Documentation**: Postman
- **Version Control**: Git and GitHub
- **Database**:PostgreSQL

- A successful response will be

     ```javascript
      { status: 'success', data: {} }
     ```
     or

     ```javascript
      { status: 'success', data: [] }
     ```

  and an unsuccessful response will be

     ```javascript
     { status: 'error', error: '​relevant-error-message' }
     ```
## Prerequisites
- NodeJs and Npm (https://nodejs.org/en/download/)

- PostgreSQL(https://www.postgresql.org/download/)"# Microsoft-Engage-Scheduler" 
