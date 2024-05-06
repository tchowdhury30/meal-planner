# Meal Planner App

## Description
This Meal Planner App is a web-based tool designed to help users organize their weekly meals efficiently. Built with React and styled using SCSS and React Bootstrap, the application integrates with Firebase for backend data storage and uses the Spoonacular API to fetch recipes. Users can manage their pantry, plan meals for the week, and explore recipes based on available ingredients. The app features a responsive, user-friendly interface enhanced by Zustand for state management and React Router for navigation.

## Key Features
- **Meal Planner**: Add, view, edit, and delete meals for each day of the week. Each meal entry includes a title, preparation steps, ingredients, an image, and meal type.
- **Pantry Management**: Track ingredients in your pantry and utilize these to generate recipes through the Spoonacular API.
- **Recipes**: Manage a personal recipe book and generate new recipes based on pantry items. Note that API limitations can affect this feature's responsiveness and availability.

## Demos
[Deployed URL](https://mealmap.onrender.com)
Takes time to render!

[Demo Video](https://drive.google.com/file/d/1fbou9jAIB3d2S5-_l-397Mih3V5pLtl5/view?usp=sharing)


## Technologies Used
- Frontend: React, SCSS, React Bootstrap, Zustand
- Routing: React Router
- Backend: Firebase
- API: Spoonacular API

## Installation and Setup
   ```bash
   git clone git@github.com:tchowdhury30/meal-planner.git
   cd meal-planner
   npm install
   npm start
   ```
   This runs the app in development mode. Open http://localhost:3000 to view it in your browser. The page will reload if you make edits.

## Known Bugs and Issues

- **Recipe Fetching and Asynchronicity**: There are intermittent issues with recipe fetching from the Spoonacular API, likely due to asynchronous operations not completing as expected. Users might need to refresh the screen often if the recipe fetching does not seem to work. Despite attempts to stabilize this with debouncing, the problem persists occasionally.
- **Deleting Meals**: Currently, deleting a meal from the recipes tab also removes it from the weekly planner if it's linked. This is due to the interconnected data handling which needs further refinement to isolate actions between different components.
- **API Rate Limiting**: The API's rate limits pose challenges in extensive testing and affect the styling of dynamically loaded recipes. Users may need to reload the entire page after adding a recipe to ensure all components update correctly.

## Challenges and Learning Points

### Asynchronous Data Handling
- **State Management**: Managing state with asynchronous API calls was a steep learning curve. At first data fetching inconsistencies led to unpredictable UI states. To combat this, I tried to implement debouncing and state management with Zustand to handle state more effectively across components, but I'm not sure if it worked.
- **UI Responsiveness**: Ensuring that the UI updates reflect the latest data was challenging. I tried to force component refreshes strategically to ensure that users always see the most recent data. But when adding a new recipie

### Dynamic Data Fetching
- **API Integration and Error Handling**: Integrating the Spoonacular API was a critical learning point. I had to handle API limitations and errors gracefully, showing placeholder messages when data couldn't be fetched. This required learning more about error boundaries in React and enhancing user experience during wait times.
- **Optimizing Requests**: Initially, fetching recipes was done one at a time, which was inefficient. I refactored the code to fetch multiple recipes in a single call and process this bulk data for display, which improved the responsiveness and efficiency of the application.

### Full Stack Integration
- **Firebase Integration**: Using Firebase as a backend was new to me. I faced challenges in setting up data storage correctly. Through trial and error, I learned about data structuring in Firebase, which are important for maintaining a scalable application.
- **Connecting Frontend with Backend**: Bridging the frontend with Firebase involved numerous challenges, particularly around syncing state between the client and server. 

### Refactoring and Code Optimization
- **Code Maintainability**: As my first major full stack project, initial attempts led to bulky components and repeated code. I learned the importance of breaking down components into smaller, reusable parts, which improved the maintainability and readability of the code.

### API Rate Limiting
- **Handling External Limitations**: Dealing with API rate limiting was particularly challenging. It forced me to think about optimizing the number of calls made and implementing caching strategies to reduce the load on the API, thus ensuring smoother user experiences even under limitations.
- **Steep Learning Curve**: This project was a significant leap from my previous academic projects, involving a wide range of technologies and integration points. The experience was immensely rewarding, providing me with hands-on experience in full stack development and a deeper understanding of what it takes to build a scalable web application from scratch.

## Future Enhancements

1. **Grocery List Integration**: A planned feature is to implement a grocery list that checks existing pantry items and compares them against the weekly meal plan. This would automatically generate a shopping list for missing ingredients, enhancing user convenience.
2. **Dietary Filtering Options**: Enhance user customization by allowing filters for dietary preferences such as vegan, gluten-free, or allergy-specific requirements. This will help tailor the meal planning experience to individual health and lifestyle needs.
3. **Automated Meal Planning**: Introduce functionality to generate entire meal plans based on user-selected filters (e.g., dietary restrictions, preferred cuisines). This feature aims to automate the meal planning process, making it more user-friendly and personalized.
4. **UI/UX Improvements**: Focus on improving the user interface and experience, particularly in the responsiveness and aesthetic presentation of the recipe suggestions and meal planning components.
5. **Code Optimization and Refactoring**: Further refine the codebase to improve performance and maintainability. This includes optimizing asynchronous operations, enhancing state management, and reducing redundancy.
