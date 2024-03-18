from django.db import models
from accounts.models import UserAccount
from django.db.models.signals import post_save
from django.dispatch import receiver

# class Profile(models.Model):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     birth_date = models.DateField()
#     image = models.ImageField(upload_to='user_profile_images/',blank=True, null=True)
#     user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, default=None)


class Profile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    image = models.ImageField(upload_to='user_profile_images/',blank=True, null=True)
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    # @receiver(post_save, sender=UserAccount)
    # def create_profile(sender, instance, created, **kwargs):
    #     if created:
    #         Profile.objects.create(user_account=instance)
