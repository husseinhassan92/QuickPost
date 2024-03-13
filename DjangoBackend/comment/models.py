from django.db import models
from post.models import Post
from django.contrib.auth.models import User

# Create your models here.
class Comment(models.Model):
    content = models.TextField()
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)