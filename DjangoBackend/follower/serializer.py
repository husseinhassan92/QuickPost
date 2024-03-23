from rest_framework import serializers
from .models import Follower

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = "__all__"