from typing import Any, override

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from tasks.models import Task
from tasks.serializers import TaskListSerializer, TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    """
    Create Task and List all tasks implementation
    """
    queryset = Task.objects.all().order_by('-modified_at')
    
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
    """
    Retrieve task, Delete task and Update task methods implementation
    """
    
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
    
    @override
    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        return Response({'detail': 'Task deleted successully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def modify_complete_status(request, pk=None) -> Response:
    """
    modify the is_complete status
    """
    task = get_object_or_404(Task, pk=pk)
    task.is_completed = not task.is_completed
    task.save()
    msg: str = 'Mark as completed!' if task.is_completed else 'Mark as not completed!'
    return Response({'detail': msg})