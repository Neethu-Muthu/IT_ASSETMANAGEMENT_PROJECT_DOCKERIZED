# IT Asset Management Application

## Project Demo

### Video Demonstration
[Watch the video!!](https://drive.google.com/file/d/1lLwx3LWbXr2F0GV60aGlyivjk5GkzHRX/view?usp=sharing)

## Project Link

you can see the project here [See the Project here](https://github.com/Neethu-Muthu/IT_ASSETMANAGEMENT_PROJECT_DOCKERIZED.git)

## Project Report
For a detailed report on the project, please refer to the [Project Report](https://drive.google.com/file/d/1z3nLPN7AsSOCuAZMqVciTe-Eeu_aZ8O5/view?usp=sharing).

### Presentation
[Download the Presentation](https://docs.google.com/presentation/d/15l-9Tspzn47lMXiPJsSw8DZ3W5MtrUYh/edit?usp=drive_link&ouid=116689071138385820690&rtpof=true&sd=true)

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)
- [Contact](#contact)

## About the Project

The IT Asset Management Application is a comprehensive tool designed to optimize the management of IT assets within an organization. In today's fast-paced technological environment, organizations need efficient systems to keep track of their assets, ensure proper allocation, and maintain accurate records.

### Key Objectives
- **Streamline Asset Management**: Simplify the process of tracking and managing IT assets such as computers, servers, and peripherals. The application provides functionalities for adding, updating, and deleting asset records.
- **Efficient User Management**: Facilitate the creation and management of user accounts, enabling administrators to assign assets, manage user roles, and oversee user activities.
- **Enhanced Asset Assignment**: Allow administrators to assign assets to employees, track asset usage, and manage assignment records to ensure assets are efficiently utilized.

### Relevance
In a dynamic organizational setting, effective IT asset management is crucial for:
- **Resource Optimization**: Ensuring that IT resources are utilized effectively and reducing redundancy.
- **Cost Management**: Monitoring and controlling expenditures related to asset procurement and maintenance.
- **Operational Efficiency**: Streamlining processes and reducing administrative overhead associated with asset management.
- **Accountability and Compliance**: Maintaining accurate records for audits, compliance, and internal reviews.

### Benefits
- **Centralized Management**: Provides a single platform for managing all IT assets and user information.
- **Improved Visibility**: Offers comprehensive dashboards and reports for better decision-making and asset tracking.
- **Enhanced Security**: Ensures that only authorized personnel can access sensitive asset and user data.

This application is particularly relevant for medium to large organizations with extensive IT infrastructure, helping them to maintain control over their assets and streamline administrative tasks, ultimately contributing to better resource management and operational efficiency.

## Prerequisites
- **Node.js** (version 14.x or later)
- **npm** (version 6.x or later)
- **MongoDB** (version 4.x or later)
- **Docker** installed on your machine
- **Docker Compose** installed on your machine

## Installation

 Getting Started

### Clone the Repository

First, clone the repository from GitHub:
git clone [[repo-url](https://github.com/Neethu-Muthu/MERN-IT_ASSET_MANAGEMENT-APP.git)]
cd MERN-ITAM-APP

### Next, use Docker Compose to build and run the containers:

docker-compose up --build

This command will build the Docker images and start the containers for the application and MongoDB database.Once the containers are running, you can access the application in your web browser at: 

http://localhost:3000

To stop the containers, press Ctrl+C in the terminal where docker-compose is running, then use:

docker-compose down

This will stop and remove the containers.

## Project Structure

- **server**: Contains the Express.js server code and docker file.
- **ui**: Contains the HTML, Tailwind CSS, and JavaScript files for the user interface and docker file.
- **docker-compose.yml**: Docker Compose configuration file for setting up the application and MongoDB containers.

## Features

### Admin
- **Manage Assets**: Add, edit, delete, and view assets.
- **Manage Users**: Create, edit, delete, and view users.
- **Assign Assets**: Assign assets to users and manage assignments.

### Employee
- **View Assigned Assets**: Employees can view the assets assigned to them.
- **Profile Management**: Employees can view and update their profile information.
- ## Workflow

### User Authentication

- **Signup**
  - Fill out and submit the signup form.
  - On success, redirect to the Login Page; on failure, show an error.

- **Login**
  - Enter credentials and submit.
  - On success, redirect to the appropriate Dashboard (Admin/Employee); on failure, show an error.

### Dashboard

- **Admin**
  - **Manage Assets**: Add, edit, or delete assets.
  - **Manage Users**: Create, edit, or delete users.
  - **Assign Assets**: Create, view, edit, or delete asset assignments.

- **Employee**
  - **View Assigned Assets**: See all assets assigned to them.
  - **Profile Management**: View and update their profile.

### Overall Workflow

1. **Authenticate**: Users sign up or log in.
2. **Access Dashboard**: Redirected to Admin or Employee dashboard.
3. **Perform Actions**:
   - Admins manage assets, users, and assignments.
   - Employees view assigned assets and manage profiles.


## Usage
### Admin
#### Login
-navigate to the login page: /login
- Enter admin credentials to access the admin dashboard.
#### Manage Assets
Add New Assets
- Go to the "Add New Asset" page.
- Fill out the asset details form.
- Submit the form to add a new asset.
#### Edit Assets
- Navigate to the asset inventory page.
- Select the asset to edit.
- Update the asset details.
- Submit the form to save changes.
#### Delete Assets
- Navigate to the asset inventory page.
- Select the asset to delete.
- Confirm the deletion.
- 
#### Assign Assets
##### Create Assignments
- Go to the asset tracking page.
- Select a user and an asset to assign.
- Set the assignment details.
- Submit the form to create the assignment.
##### View Assignments
- Navigate to the asset tracking page to view all assignments.
#### Edit Assignments
- Select an assignment to edit.
- Update assignment details.
- Submit the form to save changes.
##### Delete Assignments
- Select the assignment to delete.
- Confirm the deletion.
### Employee
#### Login
- Navigate to the login page: /login
- Enter employee credentials to access the employee dashboard.
- View Assigned Assets
- Access the employee dashboard.
- View all assets assigned to the logged-in employee.
## API Endpoints
### Authentication
- POST /api/auth/signup: Sign up a new user.
- POST /api/auth/login: Log in an existing user.
 ###Assets
- GET /api/assets: Retrieve all assets.
- POST /api/assets: Create a new asset.
- PUT /api/assets/:id: Update an existing asset.
- DELETE /api/assets/:id: Delete an asset.
### Users
- GET /api/users: Retrieve all users.
- POST /api/users: Create a new user.
- PUT /api/users/:id: Update an existing user.
- DELETE /api/users/:id: Delete a user.
### Assignments
- GET /api/assignments: Retrieve all asset assignments.
- POST /api/assignments: Create a new assignment.
- PUT /api/assignments/:id: Update an existing assignment.
- DELETE /api/assignments/:id: Delete an assignment.
## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project.
Create your Feature Branch (git checkout -b feature/AmazingFeature).
Commit your Changes (git commit -m 'Add some AmazingFeature').
Push to the Branch (git push origin feature/AmazingFeature).
Open a Pull Request.

- 
## Contact

Email- neethu.ceecs24@duk.ac.in

Project Link: (https://github.com/Neethu-Muthu/IT_ASSETMANAGEMENT_PROJECT_DOCKERIZED)

## Project Report
For a detailed report on the project, please refer to the [Project Report PDF](.[/ASSETPRO-IT_MANAGEMENT_PROJECT_REPORT.pdf](https://drive.google.com/file/d/1z3nLPN7AsSOCuAZMqVciTe-Eeu_aZ8O5/view?usp=drive_link))





This `README.md` includes all necessary details about the project, including setup, usage, project structure, API endpoints, and contribution guidelines.

