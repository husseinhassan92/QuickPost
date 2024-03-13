from django import views
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import  Response
from comment.models import *
from .serlizer import *
from django.shortcuts import get_object_or_404
from rest_framework import status



@api_view(['GET', 'POST'])
def getall(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        if comments:
            serializer = CommentSerializer(comments, many=True)
            return Response({"msg":"found","data":serializer.data})
        else:
            return Response({"msg":"no comments found"}, status=status.HTTP_404_NOT_FOUND)
        
    elif request.method == "POST":
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"Saved successfully","data":serializer.data}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
            


@api_view(['GET', 'PUT', 'DELETE'])
def crudcomment(request, id):
    comment = get_object_or_404(Comment, pk=id)
    
    if request.method == 'GET':
        return Response(CommentSerializer(comment).data)
    
    elif request.method == 'PUT':
        serializer=CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"Saved successfully","data":serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        comment.delete()
        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
