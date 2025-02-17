from django.db.models.signals import post_save, pre_save, pre_delete
from django.dispatch import receiver
from .models import *
from django.db.models import ObjectDoesNotExist


@receiver(post_save, sender=Participant)
def create_participant(sender, instance, created, **kwargs):
    if created:
        print(f'\nParticipant {instance.name} created')


@receiver(pre_save, sender=Participant)
def update_participant_vaccination(sender, instance, **kwargs):
    try:
        prev_instance = Participant.objects.get(id=instance.id)
        instance.previous_vaccination = prev_instance.vaccinated
        print(f'Vaccination info for {instance.name} updated: \n'
              f'was: {instance.previous_vaccination}\n'
              f'now: {instance.vaccinated}\n')
    except ObjectDoesNotExist:
        pass


@receiver(pre_delete, sender=Participant)
def delete_participant(sender, instance, **kwargs):
    with open('deleted_participants_log.txt', 'a') as f:
        f.write(f'Participant {instance.name} deleted\n')
