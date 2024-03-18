from rest_framework import serializers
from ..models import Comment
from profile.serializer import ProfileSerializer
from accounts.serializers import UserAccountSerializer


class CommentSerializer(serializers.ModelSerializer):
    c_author = UserAccountSerializer(read_only=True)
    profile=ProfileSerializer()
    class Meta:
        model = Comment
        fields = "__all__"


class CommentSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

