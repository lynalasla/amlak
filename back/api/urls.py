from django.urls import path,re_path
from .views import *
from rest_framework import routers


urlpatterns=[
    path('main/', AnnouncementList.as_view()),#fonctionne
    path('announcements/', SearchAnnouncementList.as_view()), #fonctionne exemple : http://127.0.0.1:8000/api/announcements/?search=vente
    path('announcements/filter', FilterAnnouncementList.as_view()),#fonctionne exemple : http://127.0.0.1:8000/api/announcements/filter?type_contrat=V
    path('new-post/',AnnouncementCreate.as_view()), #fonctionne
    path('announcement/<int:pk>', AnnouncementDetail.as_view(http_method_names=['get'])), #fonctionne
    path('announcement/<int:pk>/similar', SimilarAnnouncements.as_view(http_method_names=['get'])), #Oui
    path('announcement/<int:pk>/update', AnnouncementDetail.as_view(http_method_names=['put'])),#fonctionne recoit l'attribut à modifier
    path('announcement/<int:pk>/delete', AnnouncementDetail.as_view(http_method_names=['delete'])), #fonctionne 
    path('profile/<int:pk>', UserProfile.as_view()),   # FONCTIONNE
    path('profile/<int:pk>/announcements', UserAnnouncements.as_view()),#OUi
    path('myprofile/profile/',MyProfile.as_view()),#fonctionne 
    path('myprofile/profile/update',UpdateProfile.as_view()),#fonctionne recoit l'attribut à modifier exemple {"type_contrat":"L" }
    path('change-password/', change_password, name='change password'),#fonctionne recoit ancien mdp et nouveau mdp (ne déconnnecte pas) 
    path('myprofile/announcements',MyAnnouncements.as_view()), #fonctionne
    path('myprofile/favorites',Myfavorites.as_view()), #fonctionne
    path('announcement/<str:pk>/add-to-fav/',FavoriteView.as_view(http_method_names=['post']),name='add fav'),#fonctionne
    path('announcement/<str:pk>/add-to-fav/',FavoriteView.as_view(http_method_names=['delete']),name='delete fav'),#fonctionne
    path('register/', register_user, name='register'), #fonctionne   #exemple de ce que le back doit recevoir {"email": "jacob@esmith.fr", "password": "test7","is_company" : true ,"profile":{ "telnumber": "3929773", "nom" : "agence adrar", "location" : "Adrar rue du nananinani"}}
    path('login/', LoginAPIView.as_view(), name='login'), #FONCTIONNE recoit email et password et donne/crée token pour se connecter
    path('logout/', user_logout, name='logout'),#fonctionne recoit token et il le supprime 
    ]
