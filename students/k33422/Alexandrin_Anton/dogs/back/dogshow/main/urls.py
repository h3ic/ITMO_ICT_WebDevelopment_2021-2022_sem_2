from django.urls import path
from .views import *


app_name = "warriors_app"

urlpatterns = [
    path('experts/<int:pk>', ExpertAPIView.as_view()),
    path('participants/<int:pk>', ParticipantAPIView.as_view()),

    path('participant_ring/<int:pk>', ParticipantRingRetrieveAPIView.as_view()),
    path('club_breeds/<int:pk>', ClubBreedsRetrieveAPIView.as_view()),
    path('dismissed_count/<int:pk>', DismissedCountAPIView.as_view()),
    path('breed_experts/', BreedExpertsAPIView.as_view()),
    path('breeds_count/', BreedCountAPIView.as_view()),
    path('report/<int:year>', ReportAPIView.as_view()),

    # filters
    path('shows_by_year/', ShowsByYearListView.as_view()),
    path('shows_by_year_type/', ShowsByYearTypeListView.as_view()),
    path('participants_by_breed_age/', ParticipantsByBreedAgeListView.as_view()),

    path('participants_vaccination_order/',
         ParticipantOrderedFilterView.as_view()),
    path('rings_search/', RingSearchFilterView.as_view()),
    path('participant_age_range/',
         ParticipantAgeRangeFilterView.as_view())

]