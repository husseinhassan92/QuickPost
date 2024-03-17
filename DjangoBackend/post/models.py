from django.db import models
#from accounts.models import UserAccount
from profile.models import Profile
from datetime import datetime

# Create your models here.
# class Post(models.Model):
#     image = models.ImageField(upload_to='post/images', blank=True, null=True)
#     content = models.TextField()
#     user_id = models.ForeignKey(UserAccount,on_delete=models.CASCADE)
#     owner_id = models.ForeignKey(Profile, related_name='posts',on_delete=models.CASCADE, default=1)
#     create_date = models.DateTimeField(default=datetime.now)


class Post(models.Model):
    image = models.ImageField(upload_to='post/images', blank=True, null=True)
    content = models.TextField()
    author = models.ForeignKey(Profile, related_name='posts',on_delete=models.CASCADE)
    create_date = models.DateTimeField(default=datetime.now)


class SharePost(models.Model):
    author = models.ForeignKey(Profile, related_name='share_user',on_delete=models.CASCADE)
    post= post = models.ForeignKey(Post, related_name='share_post', on_delete=models.CASCADE)
    create_date = models.DateTimeField(default=datetime.now)

