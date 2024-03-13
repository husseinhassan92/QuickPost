from django.db import models
# from post.models import Post

class Reaction(models.Model):
    # post_id = models.ForeignKey(Post, on_delete=models.CASCADE, default=1)
    # user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    REACTION_CHOICES = [
        ('😄', 'Happy'),
        ('😢', 'Sad'),
        ('❤️', 'Love'),
        ('👎', 'Dislike'),
        ('😐', 'Normal'),
    ]
    reaction_type = models.CharField(max_length=100, choices=REACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
