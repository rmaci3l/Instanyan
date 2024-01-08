# Instanyan
Instanyan is a proto-social media project built with React and Flask that mimics social media (such as Instagram) with a basic interface and some features. Currently the **Instanyan** front-end is running over [**Netlify**](https://netlify.com/) and back-end (both flask server and postgresql database) over [**Render**](https://render.com/).

## Table of Contents
- [How to Install](#how-to-install)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Challenges and Dev. Process](#challenges-and-dev-process)
- [Future Features](#future-features)
- [Contributing](#contributing)

## How to Install

Running this application locally is quite easy!

### Requirements

  1. [Python **v3.10**](https://www.python.org/downloads/) or above.
  2. [Pipenv](https://pypi.org/project/pipenv/#installation).
  3. Local [**PostgreSQL**](https://earthly.dev/blog/postgres-docker/) database.
  4. [**Node.js** and **npm**](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Cloning

```bash
git clone https://github.com/rmaci3l/Instanyan.git
cd Instanyan
```

### Installing Dependencies

#### Server:
```bash
cd ../server
pipenv install
```

#### Client:
```bash
cd Instanyan/instanyan
npm install
```


### Edit relevant files

#### Server:

```python
#In "./server/nyan-server/index.py", edit the following line with your own JWT secret key value.
app.config['JWT_SECRET_KEY'] = os.environ.get('JWTKEY')
```

```python
# In "./server/nyans-server/models/base.py", edit the the following line with your database url.
database_url = os.environ.get('DATABASE_URL')
```

#### Client:

```javascript
// In "/instanyan/src/constants/index.js" change the backend_url with your server URL:
export const backend_url = process.env.REACT_APP_API_URL;
```

### Start application

To start the application, you just need to:

```bash
cd ./server/
./boostrap.sh
```
```bash
cd ./instanyan/
npm start
```


## Technology Stack

This project leverages a variety of both front-end and back-end libraries. 

### Key Technologies
- **React**: Main library used for the front-end application.
- **Redux**: Used for state management.
- **Redux Toolkit**: For recurring data fetching from API, specially via RTK Query.
- **Axios**: For making API calls.
- **Flask**: Main framework for building the API.
- **Flask-CORS**: Used for handling CORS making cross-origin AJAX possible.
- **Flask-SQLAlchemy**: Used for ORM interactions with the database.
- **Flask-Bcrypt**: Hashing for safe password storage.
- **Flask-JWT-Extended**: Used for handling JSON Web Tokens for proper auth management.

### UI/UX
- **Tailwind CSS**: Main framework used for styling.
- **Tailwind CSS-animated**: Used for some animations.
- **FontAwesome Icons/Hero-Icons**: Libraries used for UI icons.

## Features

- User authentication with login/register.
- Profile section with customizable avatar, status and about sections.
- Create a new post, with an image, content (text) and proper hashtags.
- Feed section with recent posts.
- Explore section with searchable posts by hashtag and searchable users.
- Follow profile function.
- Like post function.


## Challenges and Dev Process
Instanyan was my first experience with both React and Flask. I've decided to start this project from scratch and not "clone" or use a pre-made tutorial about developing a social media-like application so I could learn more through trial & error. The whole process, until the first deployable release, took about two months of developing. The entire dev process was divided into weekly sprints using SCRUM methodology.

One of the main challenges I've encountered was proper query handling using Redux Toolkit Query and also how to handle ORM within Flask-SQLAlchemy.

## Future Features
- Implement an image analysis to define if the uploaded image from user contains a cat or not using **GPT-4V** API.
- Comment section for each post.


## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.
