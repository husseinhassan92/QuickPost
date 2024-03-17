from rest_framework import serializers
from ..models import Comment
from profile.serializer import ProfileSerializer

class CommentSerializer(serializers.ModelSerializer):
    author=ProfileSerializer()
    class Meta:
        model = Comment
        fields = "__all__"


class CommentSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

