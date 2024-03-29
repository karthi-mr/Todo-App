from rest_framework import serializers

from tasks.models import Task


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        exclude = ('description', 'created_at')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'