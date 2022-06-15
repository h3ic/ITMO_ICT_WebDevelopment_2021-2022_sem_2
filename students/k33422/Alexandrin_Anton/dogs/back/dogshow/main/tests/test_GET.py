from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from ..models import *


class GetParticipantTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Club.objects.create(
            id=1,
            name='Super Club',
        )

        Participant.objects.create(
            id=1,
            name='Beck',
            breed='r',
            age=5,
            family='Unknown',
            previous_vaccination='2021-05-06',
            vaccinated='2022-05-06',
            owner_data='Unknown',
            dismissed=False,
            club=Club.objects.get(id=1)
        )

    def test_get_participant(self):
        url = reverse('main:participants', args=['1'])

        data = {
            'id': 1,
            'name': 'Beck',
            'breed': 'r',
            'age': 5,
            'family': 'Unknown',
            'previous_vaccination': '2021-05-06',
            'vaccinated': '2022-05-06',
            'owner_data': 'Unknown',
            'dismissed': False,
            'medals': [],
            'rings': [],
            'club': 1
        }

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)


class GetAgeRangeFilteredParticipantsTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Club.objects.create(
            id=1,
            name='Duck'
        )

        Participant.objects.create(
            id=1,
            name='Woody',
            breed='r',
            age=5,
            family='Unknown',
            previous_vaccination='2021-05-06',
            vaccinated='2022-05-06',
            owner_data='Unknown',
            dismissed=False,
            club=Club.objects.get(id=1)
        )

        Participant.objects.create(
            id=2,
            name='Lisa',
            breed='p',
            age=8,
            family='Unknown',
            previous_vaccination='2021-05-06',
            vaccinated='2022-05-06',
            owner_data='Unknown',
            dismissed=True,
            club=Club.objects.get(id=1)
        )

    def test_age_range_filter_participants(self):
        url = reverse('main:participants_age_range')

        data = {
            "count": 1,
            "next": None,
            "previous": None,
            "results": [
                {
                    'id': 1,
                    'name': 'Woody',
                    'breed': 'r',
                    'age': 5,
                    'family': 'Unknown',
                    'previous_vaccination': '2021-05-06',
                    'vaccinated': '2022-05-06',
                    'owner_data': 'Unknown',
                    'dismissed': False,
                    'medals': [],
                    'rings': [],
                    'club': 1
                }
            ]
        }

        response = self.client.get(url,
                                   {'age_min': '3',
                                    'age_max': '6',
                                    'ordering': 'age'
                                    },
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)


class SearchRingTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Club.objects.create(
            id=1,
            name='Super Club',
        )

        Participant.objects.create(
            id=1,
            name='Peckk',
            breed='r',
            age=5,
            family='Unknown',
            previous_vaccination='2021-05-06',
            vaccinated='2022-05-06',
            owner_data='Unknown',
            dismissed=False,
            club=Club.objects.get(id=1)
        )

        Expert.objects.create(
            id=1,
            name='Алиса',
            last_name='Ушкина',
            club='Tails'
        )

        Show.objects.create(
            year=2001,
            type='mono'
        )
        Show.objects.create(
            year=2002,
            type='poly'
        )

        Ring.objects.create(
            id=1,
            show=Show.objects.get(year=2001),
            breed='p'
        )
        Ring.objects.create(
            id=2,
            show=Show.objects.get(year=2002),
            breed='p'
        )
        Ring.objects.create(
            id=3,
            show=Show.objects.get(year=2002),
            breed='b'
        )

    def test_search_rings(self):

        ring1 = Ring.objects.get(id=1)
        ring2 = Ring.objects.get(id=2)
        ring3 = Ring.objects.get(id=3)
        expert = Expert.objects.get(id=1)

        ring1.experts.add(expert)
        ring2.experts.add(expert)
        ring3.experts.add(expert)

        url = reverse('main:search_rings')

        data = {
            "count": 2,
            "next": None,
            "previous": None,
            "results": [
                {
                    'id': 2,
                    'show': 2002,
                    'breed': 'p',
                    'experts': [1]
                },
                {
                    'id': 3,
                    'show': 2002,
                    'breed': 'b',
                    'experts': [1]
        }
            ]
        }

        response = self.client.get(url, {'search': 'poly'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)
