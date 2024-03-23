from rest_framework import serializers
from accounts.serializers import UserAccountSerializer
from .models import Follower
from profile.models import Profile

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = "__all__"


class ProfileFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'image', 'user_account']
