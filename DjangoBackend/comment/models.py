from django.db import models
from post.models import Post
#from accounts.models import UserAccount
from profile.models import Profile

# Create your models here.
# class Comment(models.Model):
#     content = models.TextField()
#     post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
#     author = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    content = models.TextField()
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)