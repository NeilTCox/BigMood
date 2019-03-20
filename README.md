# BigMood
This is the front end of the BigMood app. Uses the BigMoodAPI. See backend [here](https://github.com/johncqr/BigMoodApi).

# File Explanations
* `App.js`: Main entry point of the app; creates the network of different screens that users can navigate between.
* `config.js`: Defines global variables for internal use and easier testing.
* `libs/`: Helpful functions to be used throughout the rest of the app.
    - `apihelper.js`: API call helper functions. Makes API calls to the backend simpler (formats strings to sanitize calls). Keeps code DRY where it needs to be.
* `components/`: Collection of all the app’s different views/screens.
    - `ActivityCalendar.js`: Calendar view tab. Displays user data for month and day in detail.
    - `DailyLog.js`: Page for users to enter daily log data (events with associated moods, overall mood of the day).
    - `LandingPage.js`: The very first screen of the app that prompts users to either create an account or sign in to an existing account.
    - `SignIn.js`: User sign in page. Accepts username and password.
    - `SignUp.js`: User sign up page. Creates new user with username, first and last name, and password.
    - `SuggestionCenter.js`: Displays event and health suggestions for user. Event suggestions will be based on past events that have made the user consistently happy. Health suggestions will recommends how much more users should walk and sleep for the day.
    - `Survey.js`: Simple survey that prompts the user for some preliminary information before beginning their experience.
    - `Tabs.js`: Tabbed interface for separating different aspects of the app.
* `assets/`: Contains all image files used.

# Project Setup
1. Start the BigMoodAPI (follow setup instructions [here](https://github.com/johncqr/BigMoodApi)).
2. Navigate to the BigMood folder in command line.
3. Run `yarn install` in the root of the project directory to install all project dependencies.
4. Run `yarn start` in the root of the project directory. 
5. A QR code will appear in command line. Download and open the Expo app. Ensure that your phone and the computer running the app are connected to the same wifi network. Scan the QR code. The app will now be running on your phone.
