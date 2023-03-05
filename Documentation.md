# Advanced Web Applications Project 2023.


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
</ul>

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
    `git clone`
  
  *(or use cli)*
  2. Navigate to the project root and run `npm install`
  
  to get the required backend libraries.
  <details>
    <summary>2.5</summary>
    If you want to run the frontend seperately or run it in dev mode navigate to _adv_web_app_project_ (the frontend directory) and run 
    
    `npm install`
    
  </details>
  
  3. Start mongoDB server if not running already. 


  4. Start the server
  ```
  node app
  ```
  
  App is now running on port localhost:5000 (can be changed in app.js if needed).
</details>

## Points proposition
| Feature                                          | Max Points |
|--------------------------------------------------|------------|
| Basic features                                   | 25         |
| Deployment (can be run by just starting backend) | 2          |
| Utilization of a frontside framework: React                                                | 5          |
|                                                  |            |
|                                                  |            |
