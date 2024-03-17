from django.db import models
from accounts.models import UserAccount

# class Profile(models.Model):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     birth_date = models.DateField()
#     image = models.ImageField(upload_to='user_profile_images/',blank=True, null=True)
#     user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, default=None)


class Profile(models.Model):
    username = models.CharField(max_length=50)
    birth_date = models.DateField()
    image = models.ImageField(upload_to='user_profile_images/',blank=True, null=True)
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
