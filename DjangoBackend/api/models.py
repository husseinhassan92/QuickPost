from django.db import models
from post.models import Post 
from django.contrib.auth.models import User

class Reaction(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    REACTION_CHOICES = [
        ('😄', 'Happy'),
        ('😢', 'Sad'),
        ('❤️', 'Love'),
        ('👎', 'Dislike'),
        ('😐', 'Normal'),
    ]
    reaction_type = models.CharField(max_length=100, choices=REACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
