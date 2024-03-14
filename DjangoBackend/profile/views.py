from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Profile
from .serializer import ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
