from django.db import models
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.contrib.auth.models import User
from .constants import WILAYA_CHOICES, CONTRAT_CHOICES, BIEN_CHOICES
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from .managers import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from urllib.parse import urlparse, parse_qs

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#Custom User pour s'auth avec email 
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_company = models.BooleanField(blank=True,null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    


class Announcement(models.Model):
    
    user = models.ForeignKey(CustomUser,related_name="announcement", on_delete=models.CASCADE)
    id =models.BigAutoField(primary_key=True)
    title=models.CharField(max_length=60)
    description=models.TextField(null=True, blank=True)
    wilaya= models.IntegerField(choices=WILAYA_CHOICES, null=False)
    type_bien = models.CharField(choices=BIEN_CHOICES, max_length=1, null=False)
    type_contrat = models.CharField(choices=CONTRAT_CHOICES, max_length=1, null=False)
    meuble=models.BooleanField(null=True, blank=True)
    surface = models.IntegerField(null=True)
    image = models.ImageField(upload_to='api/images/annonces',null=True,blank=True)
    price=models.IntegerField(null=False) 
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at=models.DateTimeField(auto_now=True)
    appartment_address= models.URLField(default='https://www.google.dz/maps/@28.0948735,1.6661938,5z?hl=fr')
    favourites=models.ManyToManyField(CustomUser, related_name='favourites',default=None,blank=True)
    class Meta:
        ordering = ['-last_updated_at']
    
    def __str__(self):
        return self.title
    
    #pour le front ( vu sur youtube freecodecamps : E-commerce Website With Django and Vue Tutorial)
    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        return ''
    
    def get_thumbnail(self):
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()

                return 'http://127.0.0.1:8000' + self.thumbnail.url
            else:
                return ''
    
    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)

        thumbnail = File(thumb_io, name=image.name)

        return thumbnail
    

    def extract_coordinates_from_google_maps_link(google_maps_link):
        parsed_url = urlparse(google_maps_link)
        query_params = parse_qs(parsed_url.query)

    # Extract latitude and longitude from the query parameters
        latitude = query_params.get('q', [''])[0].split(',')[0]
        longitude = query_params.get('q', [''])[0].split(',')[1]

        return float(latitude), float(longitude)

class IndividualProfile(models.Model):

    user = models.OneToOneField(CustomUser,related_name='iprofile', on_delete=models.CASCADE)
    nom=models.CharField(max_length=60)
    prenom=models.CharField(max_length=60)
    telnumber = models.CharField(blank=False,null=False,max_length=10)
    image = models.ImageField(default="api/images/profiles/Brown pfp.jpg", upload_to='api/images/profiles/',null=True,blank=True)
    description=models.TextField(null=True, blank=True)
    announcements=models.ForeignKey(Announcement, on_delete=models.CASCADE,blank=True,null=True)

    def __str__(self):
        return self.nom+" "+ self.prenom
    

class CompanyProfile(models.Model):

    user = models.OneToOneField(CustomUser,related_name='cprofile', on_delete=models.CASCADE)
    nom=models.CharField(max_length=60)
    location=models.CharField(max_length=100)
    telnumber = models.CharField(blank=False,null=False,max_length=10)
    image = models.ImageField(default="api/images/profiles/Brown pfp.jpg", upload_to='api/images/profiles/',null=True,blank=True)
    description=models.TextField(null=True, blank=True)
    announcements=models.ForeignKey(Announcement, on_delete=models.CASCADE,blank=True,null=True)
    def __str__(self):
        return self.nom
