from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from .serializer import FollowSerializer
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['POST'])
def follow(request):
    follow = FollowSerializer(data=request.data)
    if follow.is_valid():
        follow.save()
        return Response(follow.data, status=201)
    else:
        return Response(follow.errors, status=400)