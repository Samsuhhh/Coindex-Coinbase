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

Because this application uses SQLite, the upgrade command will detect that a database does not exist and will create it. While now you are creating the database you are also seeding in our 105 businesses, 315 business images, 30 users, and all of their 270 grumbles/nopes.

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
