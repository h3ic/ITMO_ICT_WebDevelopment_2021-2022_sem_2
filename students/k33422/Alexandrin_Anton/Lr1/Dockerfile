FROM python:3.8.12

ENV docker_dog_app=/home/h3ic/ITMO_ICT_WebDevelopment_2021-2022_sem_2/students/k33422/Alexandrin_Anton/Lr1
RUN mkdir -p $docker_dog_app/dogshow

WORKDIR $docker_dog_app/dogshow
RUN ls -a

COPY . $docker_dog_app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD python manage.py runserver 0.0.0.0:8000
