from django.db import models
from  django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class AppUserManager(BaseUserManager):
    #def create_user(self, email,first_name,last_name, password=None):
    def create_user(self, email, username, is_admin=False, password=None):
        """
        Creates and saves a User with the given email, name and password.
        """
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            is_admin=is_admin
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, username, is_admin=True, password=None):
        """
        Creates and saves a Superuser with the given email, name and password.
        """
        user = self.create_user(
            email=email,
            password=password,
            username=username,
            is_admin=is_admin
        )
        user.is_admin = True
        user.save()
        return user

class UserAccount(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    is_active=models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()

    def get_full_name(self):
        return self.username

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


# class UserAccount(AbstractBaseUser,PermissionsMixin):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     email = models.CharField(max_length=50, unique=True)
#     is_active = models.BooleanField(default=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']
#     objects = AppUserManager()

#     def get_full_name(self):
#         return self.first_name

#     def __str__(self):
#         return self.email

