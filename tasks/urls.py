from django.urls import path

from tasks import views

urlpatterns = [
    path('', views.TaskListCreateView.as_view(), name='task-list-create-view'),
    path('task/<int:pk>/', views.TaskEditView.as_view(), name='task-edit-view'),
]