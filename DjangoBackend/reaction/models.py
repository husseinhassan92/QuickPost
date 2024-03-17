from django.db import models
from post.models import Post 
#from accounts.models import UserAccount
from profile.models import  Profile

# class Reaction(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
#     REACTION_CHOICES = [
#         ('😄', 'Happy'),
#         ('😢', 'Sad'),
#         ('❤️', 'Love'),
#         ('👎', 'Dislike'),
#         ('👍', 'Like'),
#       ]
#     reaction_type = models.CharField(max_length=100, choices=REACTION_CHOICES)
#     created_at = models.DateTimeField(auto_now_add=True)



class Reaction(models.Model):
    post = models.ForeignKey(Post, related_name='reactions',on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    REACTION_CHOICES = [
        ('😄', 'Happy'),
        ('😢', 'Sad'),
        ('❤️', 'Love'),
        ('👎', 'Dislike'),
        ('👍', 'Like'),
      ]
    reaction_type = models.CharField(max_length=100, choices=REACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
