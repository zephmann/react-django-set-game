from rest_framework import serializers
from django.utils.timezone import now
from high_scores.models import HighScore


class HighScoreSerializer(serializers.ModelSerializer):
    days_since_score = serializers.SerializerMethodField()

    class Meta:
        model = HighScore
        fields = '__all__'

    def get_days_since_score(self, obj):
        return (now() - obj.timestamp).days