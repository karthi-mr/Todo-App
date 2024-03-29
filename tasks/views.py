from typing import Any, override

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response

from tasks.models import Task
from tasks.serializers import TaskListSerializer, TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    
    @override
    def get_serializer_class(self) -> Any:
        if self.request.method == 'GET':
            return TaskListSerializer
        return TaskSerializer
    
    @override
    def create(self, request, *args, **kwargs) -> Response:
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'detail': 'Task created successfully.'}, status=status.HTTP_200_OK)
        return Response({'detail': 'Unknown error occurred!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TaskEditView(generics.RetrieveUpdateDestroyAPIView):
    @override
    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        task: Task = get_object_or_404(Task, pk=pk)
        serializer: Any = TaskSerializer(instance=task)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @override
    def update(self, request, pk=None,*args, **kwargs) -> Response:
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(instance=task, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'detail': 'Task updated successully.'}, status=status.HTTP_200_OK)
        return Response({'detail': 'Unknown error occurred!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        return Response({'detail': 'Task deleted successully.'}, status=status.HTTP_200_OK)