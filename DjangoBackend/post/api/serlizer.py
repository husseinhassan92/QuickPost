from rest_framework import serializers
from comment.api.serlizer import CommentSerializer
from accounts.serializers import UserAccountSerializer
#from profile.serializer import ProfileSerializer
#from profile.serializer import ProfileSerializer
from ..models import Post

class PostSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"




class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    owner = UserAccountSerializer(read_only=True)
    #profile = ProfileSerializer()
    class Meta:
        model = Post
        fields = ["content", "create_date", "comments", "owner"]
        depth = 1