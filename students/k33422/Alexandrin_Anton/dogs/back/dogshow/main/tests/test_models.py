from django.test import TestCase
from django.db.models import DateField
import datetime

from ..models import *


class MedalModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Medal.objects.create(
            medal='g',
        )

    def test_medal_field_value(self):
        medal = Medal.objects.get(id=1)
        self.assertEquals(medal.medal, 'g')


class GradeModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Participant.objects.create(
            name='Beck',
            breed='p',
            age=5,
            family='Unknown',
            vaccinated=datetime.date.today(),
            owner_data='Unknown',
            dismissed=False
        )

        Expert.objects.create(
            name='Алиса',
            last_name='Ушкина',
            club='Tails'
        )

        Show.objects.create(
            year=2001,
            type='mono',
        )

        Ring.objects.create(
            show=Show.objects.get(year=2001),
            breed='r'
        )

        Grade.objects.create(
            participant=Participant.objects.get(id=1),
            ring=Ring.objects.get(id=1),
            expert=Expert.objects.get(id=1),
            final_grade=5
        )

    def test_grade_string_representation(self):
        show = Show.objects.get(year=2001)
        participant = Participant.objects.get(id=1)
        expert = Expert.objects.get(id=1)
        ring = Ring.objects.get(id=1)

        show.participants.add(participant)
        ring.experts.add(expert)

        grade = Grade.objects.get(id=1)
        expected_grade_string_repr = f'{grade.participant.name} ' \
                                     f'{grade.ring} ' \
                                     f'{grade.expert}'
        self.assertEquals(str(grade), expected_grade_string_repr)


class ParticipantModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Participant.objects.create(
            name='Becky',
            breed='r',
            age=5,
            family='Unknown',
            vaccinated=datetime.date.today(),
            owner_data='Unknown',
            dismissed=False
        )

    def test_vaccinated_field_type(self):
        participant = Participant.objects.get(id=2)
        vaccinated_field = participant._meta.get_field('vaccinated')
        self.assertTrue(isinstance(vaccinated_field, DateField))