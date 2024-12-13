from django.db.models import Q
from rest_framework.views import APIView, status 
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.decorators import login_required
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.shortcuts import get_object_or_404, HttpResponseRedirect
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import update_session_auth_hash
from .permissions import IsOwnerOrReadOnly

#register new user , need to specify if company or not (boolean)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request,format='json'):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#login avec email et password
  
class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self,request,format='json'):
            serializer = LoginSerializer(data = request.data)
            if serializer.is_valid():
                    email = serializer.validated_data["email"]
                    password = serializer.validated_data["password"]
                    user = authenticate(request, username=email, password=password)
                    if user is not None:
                        #On crée chaque fois un token
                        token = Token.objects.create(user=user)
                        response = {
                               "status": status.HTTP_200_OK,
                               "message": "success",
                               "data": {
                                       "Token" : token.key
                                       }
                               }
                        return Response(response, status = status.HTTP_200_OK)
                    else :
                        response = {
                               "status": status.HTTP_401_UNAUTHORIZED,
                               "message": "Invalid Email or Password",
                               }
                        return Response(response, status = status.HTTP_401_UNAUTHORIZED)
            response = {
                 "status": status.HTTP_400_BAD_REQUEST,
                 "message": "bad request",
                 "data": serializer.errors
                 }
            return Response(response, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            # supp le token de l'user de la session en cours pr se deco
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)  # To update session after password change
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~é
#announcement in landing 
class AnnouncementList(APIView): 
    def get (self,request): 
        announcements = Announcement.objects.all()
        serializer = AnnouncementListSerializer(announcements, many=True)
        return Response(serializer.data)
    
#créer annonce
class AnnouncementCreate(APIView):
   permission_classes = [IsAuthenticated]
   def post (self,request):
        serializer = CreateAnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.error_messages, status=status.HTTP_406_NOT_ACCEPTABLE)

#Concerne annonce singulier
class AnnouncementDetail(APIView): 
    def get_announcement_pk(self,pk):
        try:
            announcement = Announcement.objects.get(pk=pk)
            return announcement
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get_similar_announcement (self,pk):
        announcement = self.get_announcement_pk(pk)
        try:
            similar_announcements = Announcement.objects.filter(Q(wilaya=announcement.wilaya) & Q(type_bien=announcement.type_bien) & Q(type_contrat=announcement.type_contrat))
            serializer_similar= AnnouncementListSerializer(similar_announcements)

            return Response({'announcement': serializer_similar.data})
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self,request,pk):
        announcement = self.get_announcement_pk(pk)
        serializer = AnnouncementDetailSerializer(announcement)
        return Response({
        'announcement': serializer.data})
    
    @permission_classes([IsOwnerOrReadOnly])
    def put(self,request,pk):
        announcement = self.get_announcement_pk(pk)
        serializer = UpdateAnnouncementSerializer(announcement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else :
             return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
    @permission_classes([IsOwnerOrReadOnly])
    def delete(self,request,pk):
        announcement = self.get_announcement_pk(pk)
        announcement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SimilarAnnouncements(generics.ListAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementListSerializer
    def get_announcement_pk(self,pk):
        try:
            announcement = Announcement.objects.get(pk=pk)
            similar_announcements = Announcement.objects.filter(Q(wilaya=announcement.wilaya) & Q(type_bien=announcement.type_bien) & Q(type_contrat=announcement.type_contrat))
            return similar_announcements
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get_queryset(self):
        return self.get_announcement_pk(self.kwargs['pk'])
 
#Add to fav
class FavoriteView(APIView):
    bad_request_message = 'An error has occurred'
    permission_classes = [IsAuthenticated]

    def post(self, request,pk):
        post = get_object_or_404(Announcement, pk=pk)
        if request.user not in post.favourites.all():
            post.favourites.add(request.user)
            return Response({'detail': 'User added to post'}, status=status.HTTP_200_OK)
        return Response({'detail': self.bad_request_message}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,pk):
        post = get_object_or_404(Announcement, pk=pk)
        if request.user in post.favourites.all():
            post.favourites.remove(request.user)
            return Response({'detail': 'User removed from post'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': self.bad_request_message}, status=status.HTTP_400_BAD_REQUEST)


# Filtrer + recherche 
class FilterAnnouncementList(generics.ListAPIView): 
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementListSerializer
    filter_backends = [DjangoFilterBackend] #http://example.com/api/users?search=russell
    filterset_class = AnnouncementFilterSet #exemple: http://amlak.dz/api/announcements/filter?type_contrat=L&meuble=True

class SearchAnnouncementList(generics.ListAPIView): 
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementListSerializer
    filter_backends = [SearchFilter] #http://example.com/api/announcements?search=appart
    search_fields = ['title', 'description']


#My profile 
#class Myprofile(APIView):
class MyProfile(generics.ListAPIView):
   def get(self, request):
        user = request.user
        if user.is_company:
            profile=CompanyProfile.objects.get(user=user)
            serializer =CompanyProfileSerializer(profile)
        else :
            profile=IndividualProfile.objects.get(user=user)
            serializer =IndividualProfile(profile)
        return Response({"status": "success", "User": serializer.data})

class UpdateProfile(generics.UpdateAPIView):
    def put(self,request):
        user=request.user
        if user.is_company:
            profile=CompanyProfile.objects.get(user=user)
            serializer =CompanyProfileSerializer(profile, data=request.data)
        else:
            profile=IndividualProfile.objects.get(user=user)
            serializer =IndividualProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else :
             return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

#announcements in my profile
class MyAnnouncements(generics.ListAPIView):
    serializer_class = AnnouncementListSerializer
    def get_queryset(self):
        user = self.request.user
        return Announcement.objects.filter(user=user)
#my favs
class Myfavorites(generics.ListAPIView):
    serializer_class=AnnouncementListSerializer
    def get_queryset(self):
        user= self.request.user
        return  Announcement.objects.filter(favourites=user)
    

#user__id__in = user : pour les annonces d'un compte en particulier

class UserProfile(APIView):
    permission_classes = [IsAuthenticated]
	
    def get_user_pk(self,pk):
        try:
            user = CustomUser.objects.get(id=pk)
            return user
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get(self,request,pk):
        user=self.get_user_pk(pk)
        if user.is_company:
            userprofile = CompanyProfile.objects.get(user=user)
            serializer = CompanyProfileSerializer(userprofile)
            return Response({
            'Profile': serializer.data})
        else:
            userprofile = IndividualProfile.objects.get(user=user)
            serializer = IndividualProfileSerializer(userprofile)
            return Response({
            'Profile': serializer.data})

class UserAnnouncements(generics.ListAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementDetailSerializer
    def get_queryset(self):
        return Announcement.objects.filter(user_id=self.kwargs['pk'])
    
    

  

