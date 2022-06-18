from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView, Response
from .serializers import *
from .filters import *
from .models import *
from django.db.models.aggregates import Count, Sum
from rest_framework import filters, status
from .pagination import CustomPagination
from django.views import generic


class ExpertAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpertSerializer
    queryset = Expert.objects.all()


class ParticipantAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()


class ParticipantRingRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ParticipantRingsSerializer
    queryset = Participant.objects.all()


class ClubBreedsRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ClubBreedsSerializer
    queryset = Club.objects.all()


class DismissedCountAPIView(generics.RetrieveAPIView):
    serializer_class = DismissedCountSerializer
    queryset = Show.objects.all()


# leave name
class BreedExpertsAPIView(generics.ListAPIView):
    serializer_class = BreedExpertsSerializer
    queryset = Ring.objects.all()


class BreedCountAPIView(APIView):

    def get(self, request):
        # breed_count = Participant.objects.filter(breed=breed).count()
        breed_count = Participant.objects \
            .values('breed').annotate(count=Count('breed'))
        content = {'breed_count': breed_count}
        return Response(content)


class BreedCountAPIView(APIView):

    def get(self, request):
        # breed_count = Participant.objects.filter(breed=breed).count()
        breed_count = Ring.objects \
            .values('breed').annotate(count=Count('breed'))
        content = {'breed_count': breed_count}
        return Response(content)


# class BreedCountAPIView(generics.ListAPIView):
#     serializer_class = ParticipantSerializer
#     lookup_url_kwarg = "breed"
#
#     def get_queryset(self):
#         breed = self.kwargs.get(self.lookup_url_kwarg)
#         participants = Participant.objects.filter(breed=breed)
#         print(participants)
#         return participants


class ReportAPIView(APIView):

    def get(self, request, year):
        participants = Show.objects.get(year=year).participants
        participant_count = participants.count()
        breed_count = participants.values('breed').annotate(
            count=Count('breed'))
        best_grades = Grade.objects.filter(ring__show__year=year) \
            .values('participant') \
            .annotate(ex_sum=Sum('final_grade')) \
            .order_by()
        medals = Participant.objects.values('breed') \
            .annotate(medals_count=Count('medals'))
        content = {'participant_count': participant_count,
                   'breeds': breed_count,
                   'best_grades': best_grades,
                   'medals': medals}
        return Response(content)


# FILTERS

class ShowsByYearListView(generics.ListAPIView):
    serializer_class = ShowSerializer

    def get_queryset(self):
        queryset = Show.objects.all()
        year = self.request.query_params.get('year')

        if year:
            queryset = queryset.filter(year=year)

        return queryset


class ShowsByYearTypeListView(generics.ListAPIView):
    serializer_class = ShowSerializer

    def get_queryset(self):
        queryset = Show.objects.all()
        year = self.request.query_params.get('year')
        type_ = self.request.query_params.get('type')

        print(year, type_)

        if year and type_:
            queryset = queryset.filter(year=year, type=type_)

        return queryset


class ParticipantsByBreedAgeListView(generics.ListAPIView):
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        queryset = Participant.objects.all()
        user = self.request.user

        if user.is_authenticated:
            breed = self.request.query_params.get('breed')
            age = self.request.query_params.get('age')
            if breed and age:
                queryset = queryset.filter(breed=breed, age=age)

        return queryset


# AUTO FILTERS

class ParticipantOrderedFilterView(generics.ListAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    filter_backends = (filters.OrderingFilter,)
    filterset_fields = 'vaccinated'
    pagination_class = CustomPagination


class RingSearchFilterView(generics.ListAPIView):
    queryset = Ring.objects.all()
    serializer_class = RingSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('breed', 'show__type')
    pagination_class = CustomPagination


class ParticipantAgeRangeFilterView(generics.ListAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    filterset_class = ParticipantAgeRangeFilter
    pagination_class = CustomPagination


# FILE UPLOAD

class ParticipantPhotoCreateView(generics.CreateAPIView):
    queryset = ParticipantPhoto.objects.all()
    serializer_class = ParticipantPhotoSerializer


class MultipleParticipantPhotoCreateView(generics.CreateAPIView):
    queryset = ParticipantPhoto.objects.all()
    serializer_class = ParticipantPhotoSerializer

    def post(self, request, *args, **kwargs):
        files = request.FILES.getlist('file')

        for file in files:
            participant_id = request.POST.get('participant')
            file = ParticipantPhoto(
                participant=Participant.objects.get(id=participant_id),
                file=file)
            file.save()

        return Response(str(request.data), status=status.HTTP_201_CREATED)


class ParticipantCreateAPIView(generics.CreateAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()


class VaccinationUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ParticipantVaccinationSerializer
    queryset = Participant.objects.all()


class MedalCreateAPIView(generics.CreateAPIView):
    serializer_class = MedalSerializer
    queryset = Medal.objects.all()


class GradeCreateAPIView(generics.CreateAPIView):
    serializer_class = GradeSerializer
    queryset = Grade.objects.all()


class ExpertUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ExpertSerializer
    # serializer_class = ExpertUpdateSerializer
    queryset = Expert.objects.all()


class AllParticipantAPIView(generics.RetrieveAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()


class AllExpertsView(generics.ListAPIView):
    serializer_class = ExpertSerializer
    queryset = Expert.objects.all()
    pagination_class = CustomPagination


class AllParticipantsView(generics.ListAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()
    pagination_class = CustomPagination
    filterset_class = ParticipantAgeRangeFilter


class AllShowsView(generics.ListAPIView):
    serializer_class = ShowSerializer
    queryset = Show.objects.all()