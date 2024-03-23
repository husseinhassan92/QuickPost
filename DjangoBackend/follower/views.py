from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FollowSerializer, ProfileFollowSerializer
from .models import Follower
# Create your views here.


@api_view(['POST'])
def follow(request):
    follow = FollowSerializer(data=request.data)
    if follow.is_valid():
        follow.save()
        return Response(follow.data, status=201)
    else:
        return Response({"msg":"notfound"}, status=400)


# @api_view(['GET'])
# def getfollowing(request, pk):
#     following = Follower.objects.filter(follower=pk)
    
#     if following.exists():
#         return Response({"msg": "Following found",
#                          "Following": FollowingSerializer(following, many=True).data})
#     else:
#         return Response({"msg": "No Following found for this user."}, status=404)
    

@api_view(['GET'])
def getfollowing(request, pk):
    following=[]
    following_users = Follower.objects.filter(follower=pk)
    for  i in range(len(following_users)):
        following.append(Profile.objects.filter(user_account=following_users[i].following)[0])
    serializer = ProfileFollowSerializer(following,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getfollower(request, pk):
    followers=[]
    following_users = Follower.objects.filter(following=pk)
    for  i in range(len(following_users)):
        followers.append(Profile.objects.filter(user_account=following_users[i].following)[0])
    serializer = ProfileFollowSerializer(followers,many=True)
    return Response(serializer.data)