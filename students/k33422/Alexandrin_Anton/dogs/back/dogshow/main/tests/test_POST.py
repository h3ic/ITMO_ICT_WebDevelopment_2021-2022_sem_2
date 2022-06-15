from django.test import TestCase
from django.urls import reverse
from rest_framework import status
# from django.core.files.uploadedfile import SimpleUploadedFile
# import base64
# import tempfile
# from PIL import Image

from ..models import *


class CreateMedalTest(TestCase):

    def test_create_medal(self):
        url = reverse('main:create_medal')

        data = {
            'id': 1,
            'medal': 'g'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json(), data)


class CreateParticipantTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Club.objects.create(
            id=1,
            name='Duck'
        )

    def test_create_participant(self):
        url = reverse('main:create_participant')

        data = {
            'id': 1,
            'name': 'Meck',
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
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json(), data)


class CreateGradeTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Participant.objects.create(
            id=1,
            name='Geck',
            breed='p',
            age=5,
            family='Unknown',
            vaccinated='2022-06-05',
            owner_data='Unknown',
            dismissed=False
        )

        Expert.objects.create(
            id=1,
            name='Алиса',
            last_name='Ушкина',
            club='Tails'
        )

        Show.objects.create(
            year=2001,
            type='mono',
        )

        Ring.objects.create(
            id=1,
            show=Show.objects.get(year=2001),
            breed='r'
        )

        Grade.objects.create(
            id=2,
            participant=Participant.objects.get(id=1),
            ring=Ring.objects.get(id=1),
            expert=Expert.objects.get(id=1),
            final_grade=5
        )

    def test_create_grade(self):
        url = reverse('main:create_grade')

        show = Show.objects.get(year=2001)
        participant = Participant.objects.get(id=1)
        expert = Expert.objects.get(id=1)
        ring = Ring.objects.get(id=1)

        show.participants.add(participant)
        ring.experts.add(expert)

        data = {
            'id': 1,
            'participant': 1,
            'ring': 1,
            'expert': 1,
            'final_grade': 5
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json(), data)

# class CreateParticipantPhotoTest(TestCase):
#
#     @classmethod
#     def setUpTestData(cls):
#         Participant.objects.create(
#             id=1,
#             name='Beck',
#             breed='r',
#             age=5,
#             family='Unknown',
#             previous_vaccination='2021-05-06',
#             vaccinated='2022-05-06',
#             owner_data='Unknown',
#             dismissed=False
#         )
#
#     def test_create_participant_photo(self):
#         # url = reverse('main:create_participant_photo', args=['1'])
#         # url = reverse('main:create_participant_photo')
#         url = reverse('main:create_participant_photo')
#
#         file = SimpleUploadedFile("file.png", b"file_content",
#                                   content_type="image/png")
#         # file = base64.b64decode(
#         #     "iVBORw0KGgoAAAANSUhEUgAAAAUA" +
#         #     "AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8
#         /w38GIAXDIBKE0DHxgljNBAAO" +
#         #     "9TXL0Y4OHwAAAABJRU5ErkJggg==")
#
#         # data = {
#         #     'participant': 1,
#         #     'file': file.name
#         # }
#         # image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
#         # file = tempfile.NamedTemporaryFile(suffix='.png')
#         # image.save(file)
#         #
#         # # data = {
#         # #     'participant': 1,
#         # #     'file': 'max.png'
#         # # }
#         # # file = 'participant_photo_1/file'
#         # with open(file.name, 'rb') as f:
#         #
#         #     data = {
#         #         'participant': 1,
#         #         # 'file': f.name[5:]
#         #         'file':
#         'http://testserver/participant_photo_1/tmpn96yqux2.png'
#         #         # 'file': str('http://testserver/participant_photo_1/' +
#         str(f.name[5:]))
#         #     }
#         #     print(type(data['file']))
#         #     response = self.client.post(url, data, format='json')
#         #                                 # format='multipart')
#
#         # response = self.client.post(url, {'file': file})
#         # response = self.client.post(f'{url}', {'participant': 1}, file,
#         # content_type='image/png')
#         # response = self.client.post(f'{url}', {'participant': 1, 'file':
#         # file}, format='multipart')
#         # response = self.client.post(f'{url}?participant=1', file,
#         # content_type='image/png')
#
#         # response = self.client.post(url, data,
#         # content_type='application/json')
#         from io import BytesIO
#
#         # with open('max.jpg', 'rb') as f:
#         #     data = {
#         #         'participant': '1',
#         #         'file': f
#         #     }
#         from io import BytesIO
#         img = BytesIO(b'mybinarydata')
#         img.name = 'myimage.jpg'
#         data = {
#             'participant': 1,
#             # 'name': 'max',
#             'file': img.name
#             # 'file': f'http://testserver/participant_photo_1/myimage.jpg'
#         }
#         response = self.client.post(url, data, format='multipart')
#
#         # response = self.client.post(url, data, format='image/png')
#         print(data)
#         print(response)
#         self.assertEqual(response.status_code,
#                          status.HTTP_201_CREATED)
#         self.assertEqual(response.json(), data)
