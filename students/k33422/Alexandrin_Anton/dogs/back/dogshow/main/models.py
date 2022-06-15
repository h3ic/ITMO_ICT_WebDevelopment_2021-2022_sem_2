from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import *


class Organizer(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Participant(models.Model):
    name = models.CharField(max_length=100)
    breed_types = (
        ('b', 'bulldog'),
        ('p', 'poodle'),
        ('r', 'retriever'),
    )
    breed = models.CharField(max_length=1, choices=breed_types)
    age = models.IntegerField()
    family = models.CharField(max_length=1000)
    previous_vaccination = models.DateField(null=True, blank=True)
    vaccinated = models.DateField()
    owner_data = models.CharField(max_length=1000)
    dismissed = models.BooleanField()
    club = models.ForeignKey('Club', on_delete=models.CASCADE,
                             null=True, blank=True
                             )
    rings = models.ManyToManyField('Ring', blank=True)
    medals = models.ManyToManyField('Medal', blank=True)

    def __str__(self):
        return self.name


class Medal(models.Model):
    medal_types = (
        ('g', 'gold'),
        ('s', 'silver'),
        ('b', 'bronze'),
    )
    medal = models.CharField(max_length=1, choices=medal_types)


class Show(models.Model):
    year = models.IntegerField(primary_key=True)
    show_types = (
        ('mono', 'mono-breed'),
        ('poly', 'poly-breed')
    )
    type = models.CharField(max_length=4, choices=show_types)
    participants = models.ManyToManyField('Participant',
                                          # through='Participation',
                                          related_name='show_participants'
                                          )

    def __str__(self):
        return str(self.year)


class Participation(models.Model):
    participant = models.ForeignKey('Participant', on_delete=models.CASCADE)
    show = models.ForeignKey('Show', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.participant} {self.show}'


class Expert(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    club = models.CharField(max_length=100)
    ring = models.ForeignKey('Ring', on_delete=models.CASCADE,
                             null=True, blank=True)

    def __str__(self):
        return f'{self.name} {self.last_name}'


class Club(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField('Participant',
                                     related_name='club_members',
                                     blank=True,
                                     )

    def __str__(self):
        return self.name


class Ring(models.Model):
    show = models.ForeignKey('Show', on_delete=models.CASCADE)
    experts = models.ManyToManyField('Expert',
                                     # through='Grade'
                                     related_name='ring_experts',
                                     blank=True
                                     )
    breed_types = (
        ('b', 'bulldog'),
        ('p', 'poodle'),
        ('r', 'retriever'),
    )
    breed = models.CharField(max_length=1, choices=breed_types)

    def __str__(self):
        return f'{self.show} {self.breed}'


class Grade(models.Model):
    participant = models.ForeignKey('Participant', on_delete=models.CASCADE)
    ring = models.ForeignKey('Ring', on_delete=models.CASCADE)
    expert = models.ForeignKey('Expert', on_delete=models.CASCADE)
    final_grade = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f'{self.participant.name} {self.ring} {self.expert}'


def get_upload_path(instance, filename):
    return f'participant_photo_{instance.participant.id}/{filename}'


class ParticipantPhoto(models.Model):
    participant = models.ForeignKey('Participant',
                                    on_delete=models.CASCADE,
                                    related_name='participant_photos')
    file = models.FileField(
        validators=[validate_file_size, validate_file_type],
        upload_to=get_upload_path
    )
    file_name = models.CharField(max_length=100, blank=True, null=True)
    file_size = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f'Photo of {str(self.participant)}'

    def save(self, *args, **kwargs):
        self.file_name = self.file.name
        self.file_size = self.file.size
        super(ParticipantPhoto, self).save(*args, **kwargs)
