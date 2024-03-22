from django.urls import path
from . import views

urlpatterns = [
    path('reactions/', views.get_all_reactions, name='get_all_reactions'),
    path('reactions/<int:pk>/', views.get_reaction_by_id, name='get_reaction_by_id'),
    path('reactions/add/', views.add_reaction, name='add_reaction'),
    path('reactions/unlike',views.unlike),
    #path('reactions/delete/<int:pk>/', views.delete_reaction, name='delete_reaction'),
    path('reactions/update/<int:pk>/', views.update_reaction, name='update_reaction'),
]
