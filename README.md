## TLDR; how to run
- Clone/unzip repo.
- Run the command `cd backend` & `docker-compose up -d` to bring up backend REST APIs and django admin
- Open browser and open `http://localhost:8000/admin/`
- Use default username and password of `admin` and `admin` to access the admin.


### Some additional Details
- Backend built using Python, Django, PostgreSQL and docker.
- Docker spins up 2 containers - 1 app server and 1 db server.
- Docker compose up takes care of running migrations to create the models, creating first superuser admin and starting the server.
