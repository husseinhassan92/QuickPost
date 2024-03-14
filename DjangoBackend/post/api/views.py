from django import views
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import  Response
from post.models import *
from .serlizer import *



@api_view(['GET'])
def getall(request):
    posts = Post.objects.all()
    return Response({"msg":"found","data":PostSerializer(posts,many=True).data})


@api_view(['GET'])
def getbyid(request,pk):
    try:
        posts = Post.objects.get()
    except:
        return JsonResponse({'error':'not found'},status=404)
    else:
        return Response({"msg":"found","data":PostSerializer(posts).data},status=200)

@api_view(['POST'])
def add(request):
    post = PostSerializer(data=request.data)
    if post.is_valid():
        post.save()
        return Response(post.data, status=201)
    else:
        return Response(post.errors,status=400)

@api_view(["DELETE"])
def delete(request, pk):
    post=Post.objects.filter(id=pk)
    if(len(post)>0):
        post.delete()
        return Response(data={'msg':'Post deleted'})
    return Response({'msg':'post not found'})

@api_view(['GET','PUT'])
def update(request,pk):
    posts = Post.objects.filter(id=pk).first()
    if posts:
        postdata = PostSerializer(instance=posts,data=request.data)
        if postdata.is_valid():
            postdata.save()
            return Response(data=postdata.data,status=200)
        return Response(postdata.errors,status=400)
