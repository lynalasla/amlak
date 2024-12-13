from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import IndividualProfile, CompanyProfile
    #fonction qui crée automatiquement un profil chaque fois qu'on ajoute un user est ajoué , vérifie si particulier ou agence d'abord
@receiver(post_save, sender=User)
def create_profile (sender,instance,created, **kwargs):
       if created :
        if instance.is_company:
            user_profile=CompanyProfile(user=instance)
            user_profile.save()
        else :
            user_profile=IndividualProfile(user=instance)
            user_profile.save()

from django.conf import settings

from django.dispatch import receiver
from rest_framework.authtoken.models import Token
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
                Token.objects.create(user=instance)
