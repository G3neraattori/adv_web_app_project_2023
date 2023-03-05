# Advanced Web Applications Project 2023.
This is the course project for LUT advanced web applications 2023.

## The project

### Introduction
The task was to do the following _implement a system that lets users register, login and post new code snippets. Non-authenticated users can see all the content, but they cannot post, edit, or comment items. Data has to be saved to a database and usage of content management systems (CMS, e.g. WordPress or Drupal) is not allowed. Documentation has to be written. These basic features give 25 points from the project._.
I decided to do basically the minium requirements as I didn't have too much time to do this project along with all the others course works, but none the less all the mandatory requirements should be met. 
### The implementation
The choices of the technologies were the following:
<ul>
  <li>Backend: NodeJS (mandatory). I also chose express, cors, passport, and mongoose as I was familiar with them.</li>
  <li>Database: MongoDB as it was very familiar for me</li>
  <li>Frontend: React. I originalyl thought this was mandatory if I would have realized it wasn't I would have use Vue or Angular.</li>
  <li>Design: react-bootstrap. I chose this as I had some familiarity with angular bootsrap and it made mobile friendliness easier</li>
  <li>Other: [Bootswatch](https://bootswatch.com/) for it's great prebuilt bootstrap themes and [Pexels](https://www.pexels.com/) for images.</li>
</ul>
The authentication is done with jwt Bearer tokens. React useAuth hooks would have been useful for the frontend verifications etc, but I didn't really have time to implement it. 

### Workflow
I first created the backend. The backend was mainly created from previous knowledge and built along the frontend when needed. Frontend was created using npm `create-react-app npx` and `generate-react-cli component`. Then modified to my liking. The choices and what the code does is more in detail in the project comments in the files. 
I decided to give the page somewhat of a message board look with the messages getting listed and comments being showed below the codes.

## Install
<details>
  <summary>Installation</summary>
  <br/>
  Make sure you have all the required software installed.
  <ul>
    <li>NodeJS 16 or newer</li>
    <li>MongoDB 5.0 or newer</li>
  </ul>

  1. Clone the git repo to your local machine
    `git clone https://github.com/G3neraattori/adv_web_app_project_2023.git`
  
  *(or use cli)*
  2. Navigate to the project root and run `npm install`
  
  to get the required backend libraries.
  <details>
    <summary>2.5</summary>
    If you want to run the frontend seperately or run it in dev mode navigate to _adv_web_app_project_ (the frontend directory) and run 
    
    `npm install`
    
    For debugging also run npm start in this directory
    `npm start`
    
  </details>
  
  3. Start mongoDB server if not running already. 


  4. Start the server
  ```
  node app
  ```
  
  App is now running on port localhost:5000 (can be changed in app.js if needed).
</details>

## Usage
The app contains 4 main pages each with their own functionality. The routes are listed below.

### / (homepage)
Homepage has buttons for the main pages in the app. These same sites are also present in the header. Similarly both of these content changes dependant on whether or not the user is logged in or not. 

### /register
Registering a new user can be done here. All the fields are mandatory and a new user can't be created without filling all the fields. When submitted a post request in made to the backend to create a new user (/users/register). On a successful register user is redirected to the login site.

### /login
Registered user can login here. Both the fields are mandatory. When submitted a request will be made to authenticate the user (/users/authenticate). On successful authentication a jwt token is passed and user is logged in. This will also redirect the user to the code snippets page. 

### /code
Users can submit code snippets here, submit comments and read posts. Submitting new content is only visible when user is logged in. Submitting comments or posts jwt will also be checked in the backend so the authentication cannot be skipper. The code snippet screen post request will be made to /code/newcode when creating a new code snippet and /code/comment when creating a comment. 
Also a get request will be made to /code/all on submit and page load so the code content/ comments will be loaded.
Comments are hidden inside a Accordion so they don't fill the screen when they are not wanted. Cards are used for the code blocks and  for visuals.

### Additional notes
I have tried to be through with comments in the code. However if I missed some parts. I will explain some general choices here too.
Almost all of the pages use cards to contain the content this is mostly because I like the clarity of them and they can be quite easily edited visually. 
`{!sessionStorage.getItem('jwtToken') &&}` is used quite often this is to show or hide parts of the page according to the logged in status. If the user is not logged in they will not have an jwtToken thus preventing them from seeing logged in only components. Because this could be spoofed by editing cookies, backend also checks for jwt.

## Points proposition
| Feature                                          | Max Points |
|--------------------------------------------------|------------|
| Basic features                                   | 25         |
| Deployment (can be run by just starting backend) | 2          |
| Utilization of a frontside framework: React      | 5          |
| **Total**                                        | **32**     |
