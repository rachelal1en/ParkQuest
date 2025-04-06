# ParkQuest

#### By Rachel Allen, Sara Bohannon, Sheetal Kharat, Tatiana Snook

## Description
ParkQuest is a user-friendly web application designed to help users explore and plan trips to national parks. It offers intuitive tools for browsing park details, discovering available activities, viewing campground options, and saving favorite parks — making outdoor adventure planning seamless and enjoyable.

## Technologies Used
### Backend
* Java
* Spring Boot
* National Park Service API – fetching national parks and campground information

### Frontend
* React
* Vite – fast development and build tooling
* CSS – styling

## Screenshots

## Setup & Installation
### Backend
1. Clone the repository
   
    git clone https://github.com/W-PTWD-April-2024-Liftoff/group-9
    cd parkquest-backend
2. Set up environment variables
   * In src/main/resources/application.properties, add:
    
    api.key=your_national_parks_service_api_key
4. Run the Spring Boot application:

    * Open ParkquestBackendApplication.java and click Run.
    * The backend should start at: http://localhost:8081
### Frontend
1. Move to parkquest-frontend folder:
   
    cd parkquest-frontend
2. Install frontend dependencies:
   
    npm install
7. Set up environment variables:
   
   * Create a .env file in the root directory and add:
    
    VITE_PARKS_API_KEY=your_national_parks_service_api_key
8. Run the development server
   
    npm run dev
    
    * The frontend should start at: http://localhost:5173

## Deployment

## Known Issues

* No known issues at this time.

## Acknowledgements
* National Park Service API for providing access to park and campground data.
* LaunchCode web development program - April 2024 Cohort
