from django.db import models
from accounts.models import UserAccount
from profile.models import Profile
from datetime import datetime

# Create your models here.
class Post(models.Model):
    image = models.ImageField(upload_to='post/images', blank=True, null=True)
    content = models.TextField()
    user_id = models.ForeignKey(UserAccount,on_delete=models.CASCADE)
    owner_id = models.ForeignKey(Profile, related_name='posts',on_delete=models.CASCADE, default=1)
    create_date = models.DateTimeField(default=datetime.now)
