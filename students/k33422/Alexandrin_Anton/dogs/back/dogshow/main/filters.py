from django_filters import rest_framework as filters
from .models import *


class ParticipantAgeRangeFilter(filters.FilterSet):
    age = filters.RangeFilter()
    ordering = filters.OrderingFilter(
        fields=(
            ('vaccinated', 'age')
        )
    )

    class Meta:
        model = Participant
        fields = ['age']
