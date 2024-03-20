from django.db import models
from accounts.models import UserAccount
from profile.models import  Profile


# class Follower(models.Model):
#     follower = models.ForeignKey(UserAccount, related_name="follower",on_delete=models.CASCADE)
#     following = models.ForeignKey(UserAccount, related_name="following",on_delete=models.CASCADE)

class Follower(models.Model):
    follower_profile = models.ForeignKey(Profile, related_name="follower_profile",on_delete=models.CASCADE)
    follower = models.ForeignKey(UserAccount, related_name="follower",on_delete=models.CASCADE)
    following_profile = models.ForeignKey(Profile, related_name="following_profile",on_delete=models.CASCADE)
    following = models.ForeignKey(UserAccount, related_name="following",on_delete=models.CASCADE)

