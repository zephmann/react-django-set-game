from django.urls import path
from . import views


urlpatterns = [
    path('', views.HighScoreListCreate.as_view() ),
]