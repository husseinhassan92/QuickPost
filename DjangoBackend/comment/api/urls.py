from django.urls import path
from .views import *

urlpatterns = [
    path("all/", getall),
    path('comment/<int:id>',crudcomment),
]
