from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Reaction
from .serializers import ReactionSerializer
from reaction.models import Reaction
from post.models import  Post
from accounts.models import UserAccount

@api_view(['GET'])
def get_all_reactions(request):
    reactions = Reaction.objects.all()
    return Response({"msg": "found", "data": ReactionSerializer(reactions, many=True).data})

@api_view(['GET'])
def get_reaction_by_id(request, pk):
    try:
        reaction = Reaction.objects.get(id=pk)
    except Reaction.DoesNotExist:
        return JsonResponse({'error': 'not found'}, status=404)
    else:
        return Response({"msg": "found", "data": ReactionSerializer(reaction).data}, status=200)

@api_view(['POST'])
def add_reaction(request):
    reaction = ReactionSerializer(data=request.data)
    if reaction.is_valid():
        reaction.save()
        return Response(reaction.data, status=201)
    else:
        return Response(reaction.errors, status=400)

# @api_view(["DELETE"])
# def delete_reaction(request, pk):
#     try:
#         reaction = Reaction.objects.get(id=pk)
#     except Reaction.DoesNotExist:
#         return Response({'msg': 'Reaction not found'}, status=404)
#     reaction.delete()
#     return Response({'msg': 'Reaction deleted'}, status=200)

@api_view(['GET', 'PUT'])
def update_reaction(request, pk):
    try:
        reaction = Reaction.objects.get(id=pk)
    except Reaction.DoesNotExist:
        return Response({'msg': 'Reaction not found'}, status=404)

    if request.method == 'GET':
        serializer = ReactionSerializer(reaction)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ReactionSerializer(reaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(["POST"])
def unlike(request):
    user = UserAccount.objects.get(id=request.data['user']).id
    post = Post.objects.get(id=request.data['post']).id
    unlike = Reaction.objects.filter(user=user,post=post)
    if(len(unlike)>0):
        unlike.delete()
        return Response(data={'msg':'Post unliked'})
    return Response({'msg':'post not found'})
