from django.db import models


class HighScore(models.Model):
    score = models.IntegerField()
    skipped = models.IntegerField()
    name = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
