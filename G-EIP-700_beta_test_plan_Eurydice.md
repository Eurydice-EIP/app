### **BETA TEST PLAN – Eurydice**

## **1\. Project context**

Eurydice is an application designed for people with attention difficulties to help them organize their tasks and projects in a gamified way. It centralizes everything in one place: calendar, to-do lists, timers, statistics, and reminders, while keeping the experience engaging. Users create their own tasks, organize them, and mark them as complete to progress in the “game”.

## **2\. User role**

\[The following roles will be involved in beta testing\]

| Role Name | Description |
| :---- | :---- |
| User | A regular user who can create their account, their tasks, projects, and personalize their profile |

---

## **3\. Feature table**

\[The following features will be shown during the defense\]

| Feature ID | User role | Feature name | Short description |
| :---- | :---- | :---- | :---- |
| F1 | User  | Login | Log in with an existing account using email and a password or an Oauth authentification. |
| F2 | User | Account creation | Create an account using Google OAuth or an email address and a secure password. The user will be asked to choose a username. |
| F3 | User | Task Creation | Create a task that will show up in the general to-do list or in the relevant project page. A task is composed of a name, a deadline, a time estimation and an importance estimation. Optionally, the project it belongs to, and if that task blocks/is blocked by another task. |
| F4 | User | Task Deletion | Delete a task. It will disappear from the relevant project if there is one, and will update the reward of the project accordingly. |
| F5 | User | Task Modification | Modify any information they want in a task among the ones listed in the task creation. |
| F6 | User | Task Completion | Mark a task as complete and get the indicated reward. The task will be deleted and disappear from the relevant lists and projects. |
| F7 | User | Creation of a Project | Create a project that will show up on the dashboard and project list  A project is composed of a name, a deadline, a type (main or secondary), a time estimation and an importance estimation. |
| F8 | User | Delete a Project | Delete a project with all the tasks inside. The project will disappear from the dashboard and the project list. The tasks will disappear from the account. |
| F9 | User | Add a task to a project | Add a task to a project of his choice. The task will be visible in the project and the relevant project reward will be updated accordingly. |
| F10 | User | Remove a task from a Project | Remove a task from a Project without deleting the task entirely. The task will appear in the general list, where all tasks not linked to a project are displayed. The project reward will be updated accordingly. |
| F11 | User | Modification of a project information | Modify any information of a project among the ones listed in the project creation. This modification will appear on the dashboard and project list. |
| F12 | User | Profil access | Access their own profile, with their personal information : their username, account name, profile picture, badge, level and their ID. |
| F13 | User | Avatar modification | Edit their avatar. The changes will be visible once the profile page is refreshed. |
| F14 | User | Display name modification | Edit their display name. The changes will be visible once the profile page is refreshed. |
| F15 | User | Light/Dark theme | Switch between a Light and a Dark theme. |
| F16 | User | Language | Select the language used by the app. The changes will be visible once the page is refreshed. The languages will be French and English. |
| F17 | User | Delete account | Delete their account. They will no longer be able to log in with their previous email and password, and all of the information contained by the account will be deleted.  This includes the projects, the tasks, the statistics and the xp progression. |
| F18 | User | Password forgotten | A user can change their password if forgotten. They will receive an email with the procedure to change their password. Upon logging in again, the new password will be effective. |
| F19 | User | Project completion | Complete all the tasks in a project and get the bonus reward indicated on the project page. |
| F20 | User | Level up | Upon getting enough XP, a user can level up. The level up will show up on their profile. The next level will scale to require more xp to complete. |
| F21 | User | Report bugs | Report a bug from the application using a form. |
| F22 | User | Disconnect account | Disconnect their account from the application. They will have to log in with their username/email and password the next time they want to access their profile. |
| F23 | User | Start timer | Start a timer linked to a specific task.  |
| F24  | User | Stop timer | Stop a timer linked to a task and have the time logged in the task. |
| F25 | User | Add friend | Add a user as your friend and so into your friend list. |
| F26 | User | See friend profile | Click on friends to see their profile page with a few information about them. |
| F27 | USer | Delete friend | Delete a user from your friend list. |

---

## **4\. Success Criteria**

\[Define the metrics and conditions that determine if the beta version is successful.\]

| Feature ID | Key success criteria | Indicator/metric | Result |
| :---- | :---- | :---- | :---- |
| F1 | A user can log in with their password and email, or with the OAuth without any error. | 20 attempts with email and password. 20 attempts with Oauth. 0 failures related to the application. |  |
| F2 | A user can create an account with their password and email, or with the OAuth without any error. | 10 attempts with email and password. Displays an error message if the password is wrong. 10 attempts with OAuth. 0 failures. |  |
| F3 | A user can create a task that will show up in the general list, or in the indicated project. | 10 tasks created and visible in the relevant places (10 items  list or indicated project) 0 failures |  |
| F4 | A user can delete a task. It will get removed from the account and disappear from the general list or the linked project. | 10 tasks deleted. The tasks are not visible anymore. 0 failures. |  |
| F5 | A user can modify any information they want in a task among the ones listed in the task creation. | 2 tasks with the name modified. 2 tasks with deadlines modified. 2 tasks with the time estimation modified. 2 tasks with the importance estimation modified. 2 tasks with the assigned project modified.2 tasks with the blocking task modified. 0 failures.  |  |
| F6 | A user can mark a task as complete and receive the indicated reward. The task will disappear from the relevant lists. | 10 tasks completed. The reward shows up on the profile. The task is not visible anymore.0 failures. |  |
| F7 | A user can create a project that will show up on the dashboard and project list   | 10 projects created and visible in the project list. 0 failures |  |
| F8 | A user can delete a project with all the tasks inside. The project will disappear from the dashboard and the project list. The tasks will be deleted from the account. | 10 projects deleted and not visible anymore on the account.  0 failures. |  |
| F9 | A user can add a task to a Project of his choice. The task will be visible in the project and the project reward will be updated accordingly. | 10 tasks added. Project rewards are successfully updated. 0 failures. |  |
| F10 | A user can remove a task from a Project of his choice.The project reward will be updated accordingly. | 10 tasks added. Project rewards are successfully updated. 0 failures. |  |
| F11 | A user can modify any information of a project among the ones listed in the project creation. This modification will appear on the dashboard and project list. | 2 projects with the name modified. 2 projects with the deadline modified. 2 projects with the type modified. 2 projects with the time estimation modified.  2 projects with the importance estimation modified. 0 failures. |  |
| F12 | A user can access their own profile, with their personal information : their username, account name, profile picture, badge, level and their ID. | 10 profiles accessed.  0 failures. |  |
| F13 | A user can edit their avatar. The changes will be visible once the profile page is refreshed. | 2 avatar haircuts changed. 2 avatar clothing changed. 2 avatar mouths changed. All avatar’s new versions show up on the profile. 0 failures. |  |
| F14 | A user can edit their display name. The changes will be visible once the profile page is refreshed. | 10 display names changed.  0 failures. |  |
| F15 | A user can switch between a Light and a Dark theme. | 5 changes to Dark theme.  5 changes to Light theme.  0 failures. |  |
| F16 | A user can select the language used by the app. The changes will be visible once the page is refreshed. The languages will be French and English. | 5 changes to English language. 5 changes to French language. 0 failures. |  |
| F17 | A user can delete their account. They will no longer be able to log in with their previous email and password. | 10 accounts deleted. Can’t be logged in anymore. 0 failures. |  |
| F18 | A user can change their password if forgotten. They will receive an email with the procedure to change their password. Upon logging in again, the new password will be effective. | 10 passwords changed. Log in is now made using the modified password.  0 failures. |  |
| F19 | A user can complete all the tasks in a project and get the bonus reward indicated on the project page. | 10 projects with all tasks completed. Bonus reward received. Project marked as  completed. 0 failures. |  |
| F20 | Upon getting enough XP, a user can level up. The level up will show up on their profile. The next level will scale to require more xp to complete. | 5 profiles leveled up from level 1 to 2\. 0 failures. |  |
| F21 | A user can report a bug from the application using a form. | 5 report forms sent.0 failures |  |
| F22 | A user can disconnect their account from the application. They will have to log in with their username/email and password the next time they want to access their profile. | 5 disconnections of accounts using an email/password. 5 disconnections of an account using OAuth. 0 failures. |  |
| F23 | A user can start a timer linked to a specific task.  | Timer started 5 times. 0 failures. |  |
| F24 | A user can stop a timer linked to a task and have the time logged in the task. | Timer stopped 5 times. Time passed during the timer can be seen on the task. 0 failures. |  |
| F25 | A user can add another user as a friend and so into their friend list. | 5 users added. Users appear in the friend list. 0 failures. |  |
| F26 | Click on friends to see their profile page with a few information about them. | 5 friend profiles clicked. Friend profile appears. 0 failures. |  |
| F27 | A user can delete another user of their friend list. | 5 users deleted from a friend list.  0 failures. |  |

