from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('profile/<int:pk>',getbyuser),
]