from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import Profile
from .serializer import ProfileSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from accounts.models import UserAccount

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # function to get profile id bu using userid  ,,,,but make userid one to one with profile im model 
# class LastProfileAPIView(APIView):
#     def get(self, request, format=None):
#         try:
#             last_profile = Profile.objects.latest('created_at')
#             serializer = ProfileSerializer(last_profile)
#             return Response(serializer.data)
#         except Profile.DoesNotExist:
#             return Response({"detail": "No profiles found"}, status=status.HTTP_404_NOT_FOUND)