from rest_framework import serializers
from .models import *


class ExpertSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expert
        fields = "__all__"


class ParticipantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = "__all__"


class ParticipantRingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = ["rings"]


class ParticipantBreedsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = ["breed"]


class ClubBreedsSerializer(serializers.ModelSerializer):
    members = ParticipantBreedsSerializer(many=True)

    class Meta:
        model = Club
        fields = ["name", "members"]


class RingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ring
        fields = "__all__"


class DismissedCountSerializer(serializers.ModelSerializer):

    dismissed_count = serializers.SerializerMethodField()

    class Meta:
        model = Show
        fields = ['year', 'dismissed_count']

    def get_dismissed_count(self, obj):
        return obj.participants.filter(dismissed=True).count()


class BreedExpertsSerializer(serializers.ModelSerializer):
    experts = ExpertSerializer(many=True)

    class Meta:
        model = Ring
        fields = ["breed", "experts"]


class ShowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Show
        fields = "__all__"


class GradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grade
        fields = "__all__"


class ParticipantPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParticipantPhoto
        fields = ['participant', 'file']


class ParticipantVaccinationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = ['name', 'previous_vaccination', 'vaccinated']


class MedalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medal
        fields = '__all__'


class ExpertUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expert
        fields = ['club', 'ring']
