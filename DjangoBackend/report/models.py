from django.db import models
from accounts.models import UserAccount
from post.models import Post

# Create your models here.

class Report(models.Model):
    post = models.ForeignKey(Post,related_name='report', on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    reason = models.CharField(max_length=200)
    
    def __str__(self):
        return f"Reported {self.post} by {self.user}"