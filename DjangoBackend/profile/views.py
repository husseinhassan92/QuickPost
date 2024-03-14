from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Profile
from .serializer import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer
