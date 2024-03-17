from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import UserAccount
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password')


class UserAccountSerializer(serializers.ModelSerializer):
    class  Meta:
        model = UserAccount
        fields = ["email", "id", "username"]