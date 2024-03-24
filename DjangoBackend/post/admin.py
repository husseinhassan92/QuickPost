from django.contrib import admin

# Register your models here.
from .models import  *

# Register your models here.
# class RAdmin(admin.ModelAdmin):
#     list_display = ['reaction_type', 'created_at']
admin.site.register(Post)