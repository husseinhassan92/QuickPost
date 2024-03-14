from django.db import models
from django.contrib.auth.models import User


class Reaction(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE)
    following = models.ForeignKey(User, on_delete=models.CASCADE)

