from django.urls import path
from .views import *


urlpatterns = [
    path('follow/',follow),
    path('following/<int:pk>/',getfollowing),
    path('follower/<int:pk>/',getfollower)
]