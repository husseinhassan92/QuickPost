from django.db import models
from  django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email,username, password=None):
        if not email:
            raise  ValueError('User must have an email address')
        
        if not password:
            raise ValueError('A password is required.')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()
        return user

class UserAccount(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()

    def get_full_name(self):
        return self.username

    def __str__(self):
        return self.email


