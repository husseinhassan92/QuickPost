from django.urls import path
from .views import *

urlpatterns = [
    path("all/", getall),
    path('post/<int:pk>',getbyid),
    path('add/',add),
    path('del/<int:pk>',delete),
    path('update/<int:pk>',update),
    path('user/<int:pk>', getbyuser),
    path('share/',share),
    path('unshare/<int:pk>',unshare),
]
