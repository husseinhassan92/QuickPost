from django import views
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import  Response
from profile.models import  Profile
from rest_framework.parsers import MultiPartParser, FormParser
from post.models import *
from .serlizer import *



@api_view(['GET'])
def getall(request):
    posts = Post.objects.order_by('-create_at').all()
    s_posts = SharePost.objects.order_by('-create_at').all()
    return Response({"msg":"found",
                    "posts":PostSerializer(posts,many=True).data,
                    "shared":ShareSerializer(s_posts,many=True).data})


@api_view(['GET'])
def getbyid(request,pk):
    try:
        posts = Post.objects.get()
    except:
        return JsonResponse({'error':'not found'},status=404)
    else:
        return Response({"msg":"found","data":PostSerializer(posts).data},status=200)

# @api_view(['POST'])
# def add(request):
#     parser_classes = (MultiPartParser, FormParser)
#     post = PostSerializerAdd(data=request.data)
#     if post.is_valid():
#         post.save()
#         return Response(post.data, status=201)
#     else:
#         return Response(post.errors,status=400)

@api_view(['POST'])
def add(request):
    parser_classes = (MultiPartParser, FormParser)
    post_serializer = PostSerializerAdd(data=request.data)
    if post_serializer.is_valid():
        post_instance = post_serializer.save()
        response_serializer = PostSerializer(post_instance)  # Serialize the created post instance
        return Response(response_serializer.data)
    else:
        return Response(post_serializer.errors)

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



# @api_view(['GET'])
# def getbyuser(request,pk):
#     posts = Post.objects.filter(author=UserAccount.objects.get(id=pk))
#     s_posts = SharePost.objects.filter(author=UserAccount.objects.get(id=pk))
#     return Response({"msg":"posts Found",
#                     "post":PostSerializer(posts,many=True).data,
#                     "shared":ShareSerializer(s_posts,many=True).data})

@api_view(['GET'])
def getbyuser(request, pk):
    posts = Post.objects.filter(p_author=UserAccount.objects.get(id=pk))
    s_posts = SharePost.objects.filter(author=UserAccount.objects.get(id=pk))
    
    if posts.exists() or s_posts.exists():
        return Response({"msg": "Posts found",
                         "posts": PostSerializer(posts, many=True).data,
                         "shared": ShareSerializer(s_posts, many=True).data})
    else:
        return Response({"msg": " no Posts",
                         "posts": PostSerializer(posts, many=True).data,
                         "shared": ShareSerializer(s_posts, many=True).data})

@api_view(['POST'])
def share(request):
    share_post = ShareSerializerAdd(data=request.data)
    if share_post.is_valid():
        share_post.save()
        return Response(share_post.data, status=201)
    else:
        return Response(share_post.errors,status=400)

@api_view(["POST"])
def unshare(request):
    author = UserAccount.objects.get(id=request.data['author']).id
    post = Post.objects.get(id=request.data['post']).id
    unshare = SharePost.objects.filter(author=author,post=post)
    if(len(unshare)>0):
        unshare.delete()
        return Response(data={'msg':'Post unshared'})
    return Response({'msg':'post not found'})
