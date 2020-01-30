from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from high_scores import views


router = routers.DefaultRouter()
router.register(r"high_scores", views.HighScoreListCreate, "high_score")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(router.urls)),
]
