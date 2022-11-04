# Welcome to TravelBnb!

TravelBnB is a web application clone inspired by Airbnb, that allows online users to rent homes and other types of properties for vacations and other kinds of activities.
* [Live Site](https://travelbnb-kai.herokuapp.com/)

List of technologies used on the project:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)


# Features:




















# Launch the application locally:
1. Clone this repository
2. `cd` into the repository
3. `npm install` to install dependencies in both frontend folder and backend folder.
4. Create a `.env` file using the `.env.example` as a guide.
    ```
    PORT=
    DB_FILE=db/dev.db
    JWT_SECRET=
    JWT_EXPIRES_IN=
    ```
5. Move to backend directory.
6. Run `npx dotenv sequelize db:migrate`
7. Run `npx dotenv sequelize db:seed:all`
8. With two terminals, Run `npm start` in both frontend folder and backend folder to start the application.
