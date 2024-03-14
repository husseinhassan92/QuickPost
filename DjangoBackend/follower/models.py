from django.db import models
from account.models import UserAccount


class Follower(models.Model):
    follower = models.ForeignKey(UserAccount, related_name="follower",on_delete=models.CASCADE)
    following = models.ForeignKey(UserAccount, related_name="following",on_delete=models.CASCADE)

