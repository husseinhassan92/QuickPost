from django.db import models
from django.conf import settings
from profile.models import Profile  # Import the Profile model from your accounts app

class ChatMessage(models.Model):
    # Define model fields
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="user")
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="sender")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="receiver")
    message = models.CharField(max_length=10000000000)
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']
        verbose_name_plural = "Messages"

    def __str__(self):
        return f"{self.sender} - {self.receiver}"

    @property
    def sender_profile(self):
        try:
            sender_profile = Profile.objects.get(user_account=self.sender)
            return sender_profile
        except Profile.DoesNotExist:
            return None

    @property
    def receiver_profile(self):
        try:
            receiver_profile = Profile.objects.get(user_account=self.receiver)
            return receiver_profile
        except Profile.DoesNotExist:
            return None
