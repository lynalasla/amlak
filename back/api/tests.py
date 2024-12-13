from django.test import TestCase
from django.test import RequestFactory
from rest_framework.test import APITestCase
from api.models import Announcement, CustomUser
from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase


class createAnnouncementTestCase(APITestCase):

    def test_create_announcement_with_valid_data(self):
        obj = Announcement.objects.create(
            user = CustomUser.objects.create(email="user@test.com",password="azertyuiop",is_company=False),
            title = "Location appart alger CC",
            description = "Français",
            type_contrat = "L",
            type_bien = "A",
            description = "urgfcyeuvknrjbh",
            price = 1500,
            meuble=True,
            wilaya = 16
        
        )
        self.assertEqual(len(Announcement.objects.filter(id = obj.id)), 1)

class createUserTestCase(APITestCase):

    def test_create_user_with_valid_data(self):
        obj= CustomUser.objects.create(email="user@test.com",password="azertyuiop")
        self.assertEqual(len(CustomUser.objects.filter(id = obj.id)), 1)
    def test_delete_user_with_valid_data(self):
        obj= CustomUser.objects.create(email="user@test.com",password="azertyuiop")
        obj.delete()
        self.assertEqual(len(CustomUser.objects.all()), 0)
