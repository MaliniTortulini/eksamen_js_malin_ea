# Dynamic CV Exam React 

### Grade: C

This application helps you create a resume quickly and easily. As a regular user, you must be provided with an email and a password to create, update, and delete your own resume. An admin user has access to every resume, and they can delete, update, and create a resume for both themselves and other regular users. Admins are also responsible for managing users, updating them, and deleting users. 


## How to install

### 1. Clone 
Start by cloning the repository by using git:
git clone https://github.com/MaliniTortulini/eksamen_js_malin_ea

### 2. Navigate to the projectfile 
cd 'your-project'

### 3. Install 
by using npm: npm install
by using yarn: yarn install

### 4. Start the application
by using npm: npm run dev or npm start
by using yarn: yarn start

### 5. Open the application
Open the application in your browser using localhost.

### 6. Api key
Go to crudcrud.com or crudapi.co.uk to add your own api key to be able to use the CRUD applications. If you use crudcrud.com you have to change links in crud.ts.


### The Application
When you first open the application, you will be on the landing/homepage. From here, you can only log in. When you click "Login" in the navbar, you must log in using the email and password you were provided. You cannot register a user.

**If you are a user**: You have an email and password provided by an admin. Log in with those. Once logged in, you can go to the homepage or "My CV." In "My CV," you can create your own resume by clicking the "Create CV" button in the top left corner. After doing that, you can see your resume, and two new buttons appear at the bottom: one to update your resume and one to delete it. You can also log out using the logout button in the top right corner.

 **If you are an admin**: You have an email and password provided by another admin. Log in with those. Once logged in, you can go to the homepage, "My CV," and the "Admin" page. In "My CV," you can create your own resume by clicking the "Create CV" button in the top left corner. After doing that, you can see your resume, and two new buttons appear at the bottom: one to update your resume and one to delete it. As an admin, you have access to the admin dashboard, which appears in the navbar. When you click on "Admin," you will see two options: "Users" and "CVs." In "Users," you can create a new user with a name, email, password, and role. You can also view all users (both regular and admin users), and you can update or delete them. When you click on "CVs," you can see all the resumes that have been created, and you can update or delete them as well. You can also log out using the logout button in the top right corner.

 First time using the application?
 Use the email **admin** and password **admin**


## API information
- GET: Retrieve data about users and CVs.
- POST: Add new users and CVs.
- PUT: Update existing data.
- DELETE: Remove existing data. 


## Technology Choices
- TypeScript: I used TypeScript because it was encouraged, and I like that it helps prevent type/data mistakes.
- React: React was used because it was required, and it's a powerful library for building user interfaces.  
- Vite: I used Vite as a build tool because it's an easy and fast way to set up a JavaScript application.
- TailWindCSS: I used this styling framework to save time writing custom CSS, and it allows for designing directly in HTML.
- DaisyUI: DaisyUI is built on top of TailwindCSS and provides pre-designed components.
- ESLint: I used ESLint to keep the code clean and to catch issues before running the code.
- Jest: Jest was used for testing the application to ensure that functions work as expected.
- React Router:  I used React Router to handle navigation between different pages in the application.
- dotenv: dotenv allows me to securely store sensitive data, like API keys.
- crudapi.co.uk: I used this API service to set up an easier backend for CRUD operations without having to build one myself.


## Architecture

This project is built with a component structure using React and TypeScript. The backend is connected to CrudAPI for storing all the data. This includes data that updates and deletes on the web application, which is also reflected in the backend.

- **Rootfolder**: This folder contains all the configuration files that came with the initial setup, including those for Vite, TypeScript, Jest, and TailwindCSS. The .gitignore file is here, along with .env to store sensitive information like the CrudAPI key. It also includes this README file for documenting the project.
- **src**:This folder contains all the source code, including the main file (main.tsx) that connects all the data through the router.tsx file. The CSS file connected to main.tsx is also here since it's a global CSS file.
- **assets**: This folder contains images.
- **components**: This folder contains all the important components that build the page files. For example, Navbar.tsx is a navigation menu that dynamically changes based on the user role. Modules like Link, useFetcher, and useLocation help create navigation links integrated with React Router, log out the user without needing to reload the website, and provide information about the current URL so the navigation adapts to the active route. Other components like CvFormAdmin.tsx manage creating and updating resumes. This component collects user data and sends it to the server through API calls. It also includes functionality for fetching users and existing CVs, validating data, and sending the form. I had to make one almost identical called CvFormUser.tsx because user have some differences to admin. Like the name when creating and updating is supposed to be the same all the time. 
- **config**: This folder contains the router.tsx file, which configures the router for the React application with help from React Router DOM. It defines how different routes are handled, which components are rendered, and what data is loaded via loader.ts or actions through actions.tsx.
- **handlers**: This folder contains the loaders.ts and actions.tsx files. loaders.ts fetches data and executes logic before a page is loaded, including handling redirects based on user state, like authentication. Actions.tsx contains side-effect functions like handling requests from forms or other user interactions involving data manipulation (creating, updating, or deleting data).
- **pages**: The pages folder contains all the files with the pages you can go to on the website. Root.tsx is he home page where you can see the backgound with the welcome text and navbar. And the admin pages you can only access if you are logged in with admin. It also includes the user page/route that only regular users can access. But admin can get the same data and more. Lastly, the login page allows users to sign in, but not register.
- **script**: This is a file that will give you an default admin user if you have no admin users. If you delete all of them and tries to get back in with email: admin and password: admin. You have to go back to homepage for it to make you a default admin user again. 
- **testing**: The testing folder contains tests for CRUD endpoints but doesn’t include all the tests I planned to write.
- **types**: This folder contains defined TypeScript types and is an important part of TypeScript to help with type safety. It’s used to describe the structure of the data in the application
- **utils**: This folder contains helper files. auth.ts is a simple auth provider for managing user authentication using localStorage to store and retrieve auth data. It includes methods like login, logout, and fetching user data and roles. parseJSON.ts is a helper component used in actions.tsx to ensure the application doesn’t crash when handling invalid JSON strings.


## Testing
If you want to try out Jest, you can write: 
by using npm: npm test
by using yarn: yarn start

I created an almost identical file to crud.ts due to how the backend and frontend import data from .env. The only difference is how the CrudAPI key is imported into the code.

I wanted to use Jest more, but I didn’t have enough time. However, if I had more time, I would have tested:

- The components to ensure they behave correctly, especially forms to check if they validate and save data properly.
- The handlers, which include many CRUD operations, should be tested.
- Pages, as they also include CRUD functions, should be tested with Jest.
- The utils, as they contain logic that should also be tested.


## Bugs and mistakes 
- **Regular user**: When wanting to create a a cv as a regular user, the name automaticlly uses the last user made. This is becouse of a map mistake i didn't have time to fix. So a admin have to make the cv first, then you can update and delete. But when you update the userId number changes. So then the user won't have a resume. It is very frustrating, but at least you get the right resume to the right user before you update. 
- **Reloading issue**: Sometimes when you reload the app, it crashes. All you need to do is reload one or two more times. Also, when creating a CV, you’ll get "N/A." You have to reload, and sometimes it crashes again. But if you reload once more, the correct information will show in the CV. The data is saved in CrudAPI, but the app doesn’t seem to recognize it right away. When deleting, you might see a console log indicating that CRUD didn’t work, but after reloading, you’ll see that it did delete from CrudAPI.
- **More buttons in CV forms**: I did not think about the fact that you could have gone to different schools or worked different places, so one input is not enough. You could also use a comma and write in the same input. But it is not the best in the long term and when it comes to what year. 
- **Name update**: Regular users cannot update their own name in their CV—only admins can do that. I thought the select dropdown was convenient for creating CVs, but you can’t update your name after, for example, getting married.
- **Search for skills and projects**: I didn’t have time to add a search bar, and I didn’t realize projects were needed. You can use the "other" option to add your projects, but with a search bar, they would need to be separated instead of being in the same input.
- **Role selection**: The role should have had a select dropdown, not an input field, so you could only choose "user" or "admin." Currently, you can write anything, and if it's something else, you won’t be able to log in.
- **PDF**: I wanted to try generating a PDF for the CV but didn’t have time. I would have added a button in the top left corner where the "Create CV" button is located.
- **Create CV button**: For regular users, the "Create CV" button should not be visible if a CV has already been created, but it will appear again when you delete your resume.
- **Unique key prop**: 
- **Deleting Cv**: If you delete a user, the CV that is connected to the user does not get deleted. You have to manuelly delete that as well. 
- **Passwords**: Passwords are not supposed to be seen so easily like that, it should normaly be bcrypt. 
- **Admin making a cv**: If an admin wants to make an cv they have to do it through Cv's and connect their user to it.


## Inspiration 
Arbeidskrav 2: A classmate and I created this project https://github.com/yokode425/arbeidskrav_2_javazone
I took inspiration from its component structure, TypeScript use, and the design choices from Tailwind and DaisyUI.