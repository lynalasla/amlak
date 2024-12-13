from rest_framework import serializers
from django_filters import rest_framework as filters 
from .models import *
from rest_framework.authtoken.models import Token

class ProfileSerializer(serializers.Serializer):
    nom = serializers.CharField(max_length=60,required=False)
    prenom = serializers.CharField(max_length=60,required=False)
    location = serializers.CharField(max_length=100,required=False)
    telnumber=serializers.CharField(max_length=10,required=False)
    image=serializers.ImageField(required=False)


class UserSerializer(serializers.ModelSerializer) : 
    class Meta:
        model = CustomUser
        fields=['id','email']


class RegisterSerializer(serializers.ModelSerializer):
  iprofile=ProfileSerializer(required=False)
  cprofile=ProfileSerializer(required=False)
  class Meta:
    model = CustomUser
    fields = ['email','password','is_company','iprofile','cprofile']
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            is_company=validated_data['is_company']
        )
        user.set_password(validated_data['password'])
        user.save()
        # create profile
        if validated_data['is_company']==True:
            profile_data = validated_data.pop('cprofile')
            profile = CompanyProfile.objects.create(
                user = user,
                nom = profile_data['nom'],
                location = profile_data['location'],
                telnumber = profile_data['telnumber']
            )
        else : 
            profile_data = validated_data.pop('iprofile')
            profile = IndividualProfile.objects.create(
                user = user,
                nom = profile_data['nom'],
                prenom = profile_data['prenom'],
                telnumber = profile_data['telnumber']
            )
        return user



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)




class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password=serializers.CharField()
    class Meta:
            model = CustomUser
            fields = ['email','password']




#annonces mais sans les details ( for landing page and research..etc)
class AnnouncementListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['title','image','type_bien','type_contrat','price','wilaya']
#annonce détaillée (  lorsqu'on clique sur une annonce)
class AnnouncementDetailSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model = Announcement
        fields = ['user','title','description','image','type_bien','type_contrat','price','wilaya','last_updated_at','appartment_address']
        read_only_fields= ['user']

#serializer pour créer/modifier

class CreateAnnouncementSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model = Announcement
        fields = ['user','title','description','image','meuble','surface','type_bien','type_contrat','price','wilaya','appartment_address']

class UpdateAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['title','description','image','meuble','type_bien','type_contrat','price','wilaya','appartment_address']
        extra_kwargs = {'title':{'required': False},'description':{'required': False},'image':{'required': False},'meuble':{'required': False},'type_bien':{'required': False},'type_contrat':{'required': False},'price':{'required': False} ,'wilaya':{'required': False} ,'appartment_address': {'required': False}}

#Pour filtrer
class AnnouncementFilterSet(filters.FilterSet):
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_surface = filters.NumberFilter(field_name='surface',lookup_expr='gte')
    max_surface = filters.NumberFilter(field_name='surface',lookup_expr='lte')

    class Meta:
        model = Announcement
        fields = ['wilaya','price','meuble','type_contrat','type_bien','surface']



class IndividualProfileSerializer(serializers.ModelSerializer):
  class Meta: 
        model= IndividualProfile
        fields=  ['image', 'nom', 'prenom','description','telnumber']
        extra_kwargs = {'nom':{'required': False},'prenom':{'required': False},'description':{'required': False},'image':{'required': False},'telnumber':{'required': False}} 
  
   
class CompanyProfileSerializer(serializers.ModelSerializer):
  class Meta: 
        model= CompanyProfile
        fields=  ['image', 'nom', 'location','description','telnumber']
        extra_kwargs = {'nom':{'required': False},'location':{'required': False},'description':{'required': False},'image':{'required': False},'telnumber':{'required': False}} 
  

