## TLDR; how to run
- Clone/unzip repo.
- Run the command `cd backend` & `docker-compose up -d` to bring up backend REST APIs and django admin
- Open browser and open `http://localhost:8000/admin/`
- Use default username and password of `admin` and `admin` to access the admin.
- Swagger docs and testing interface available at `http://localhost:8000/docs/`
- `cd frontend` run `npm i` to install dependencies.
- `npm run start` will launch `[localhost](http://localhost:3000/)` Where the FE is hosted.


### Some additional Details
- Backend built using Python, Django, PostgreSQL and docker.
- Docker spins up 2 containers - 1 app server and 1 db server.
- Docker compose up takes care of running migrations to create the models, creating first superuser admin and starting the server.
- The frontend runs on local and not docker.
  
