from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from .views import ProfileSearchAPIView

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('profile/user/<int:pk>',getbyuser),
    path('profiles/search/', ProfileSearchAPIView.as_view(), name='profile-search'),

]