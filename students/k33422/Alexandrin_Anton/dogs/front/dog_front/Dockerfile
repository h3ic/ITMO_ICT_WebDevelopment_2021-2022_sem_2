FROM node:lts-alpine

# RUN npm install -g http-server

ENV docker_dog_app=/home/h3ic/ITMO_ICT_WebDevelopment_2021-2022_sem_2/students/k33422/Alexandrin_Anton/dogs/front/dog_front
# RUN mkdir -p $docker_dog_app/dog_front

# WORKDIR $docker_dog_app/dog_front
WORKDIR $docker_dog_app

# COPY . $docker_dog_app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# CMD ['http-server', 'dist']
CMD npm run serve
