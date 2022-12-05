# Coindex
Welcome to [Coindex](https://coindex-ss.herokuapp.com/), a cryptocurrency marketplace project inspired by [Coinbase.com](https://www.coinbase.com/). Coindex offers live data for the prices and market details of 30 of the most popular cyrptocurrencies currently available in the market. All market data was pulled from the Coingecko API and differ slightly in price with Coinbase.com. It should be noted that any transactions made on Coindex are NOT legitimate and are for demonstrative purposes only. Please be careful not to enter any real sensitive information on our site, especially your real credit card information. 

### Next Steps
- Implement a send and receive feature between wallets on the Coindex database.
- Improve the consistency of some CSS styling choices.
- Implement site wide DARK MODE setting
- Implement Watchlist feature on home page.

## Tech Stack

### Frameworks, Platforms, and Libararies: 

![Javascript](https://img.shields.io/badge/Javascript%20-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![REACT](https://img.shields.io/badge/REACT%20-61DAFB?style=for-the-badge&logo=REACT&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express%20-000000?style=for-the-badge&logo=REACT&logoColor=white)
![REDUX](https://img.shields.io/badge/Redux%20-764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.Js%20-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)

### Database and Host:
![Postgresql](https://img.shields.io/badge/Postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white)



## Get Started!

### Clone repository.

- SSH:

```
git@github.com:Samsuhhh/Coindex-Coinbase.git
```

- HTTPS:

```
https://github.com/Samsuhhh/Coindex-Coinbase.git
```

- CLI:
```
gh repo clone Samsuhhh/Coindex-Coinbase
```

### Install dependencies & Prep database.
- In the project directory you will run:

```
pipenv install
```

This command will install packages into the pipenv virtual environment and update your Pipfile.

- Create a .env file in said current directory.
- Paste in SECRET_KEY and DATABASE_URL configurations.

```
SECRET_KEY=<<SECRET_KEY>>
DATABASE_URL=sqlite:///dev.db
```

The .env file contains the individual user environment variables that override the variables set in the /etc/environment file. You can customize your environment variables as desired by modifying your .env file. In this case we are setting the SECRET_KEY and the DATABASE_URL.

- While in your root directory run:

```
pipenv shell
```

This will create a new active pip environment for  you to run your backend.

- Followed by:

```
flask db upgrade
flask seed all
pipenv run flask run
```

Because this application uses SQLite, the upgrade command will detect that a database does not exist and will create it. 

- Navigate to your /Coindex-Coinbase/react-app/ folder and create another .env file.
- Paste in the REACT_APP_BASE_URL

```
REACT_APP_BASE_URL=http://localhost:5000
```
We'll be pasting in the path to server for frontend into this newly created environment file.

- All there is to do is:

```
npm install
```
This command installs a package and any packages that it depends on. Since the package has a package-lock the installation of dependencies will be driven by that. If you take a peak into your package.json file you can see all the dependencies our project is installing.

```
npm start
```
This runs a predefined command specified in the "start" property of a package's "scripts" object in our case it is:

```
"start": "react-scripts start"
```
DO NOT paste this anywhere. The code above is already provided in our package.json file!


Shout out Coingecko for a great cryptocurrency API! 
https://www.coingecko.com/en/api/
