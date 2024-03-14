from django.contrib import admin
from .models import  Reaction

# Register your models here.
class ReactionAdmin(admin.ModelAdmin):
    list_display = ['reaction_type', 'created_at']
admin.site.register(Reaction, ReactionAdmin)