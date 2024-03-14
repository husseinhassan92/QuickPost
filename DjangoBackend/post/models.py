from django.db import models
from account.models import UserAccount
from datetime import datetime

# Create your models here.
class Post(models.Model):
    image = models.ImageField(upload_to='post/images', blank=True, null=True)
    content = models.TextField()
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    create_date = models.DateTimeField(default=datetime.now)
