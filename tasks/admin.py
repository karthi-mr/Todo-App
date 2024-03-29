from django.contrib import admin

from tasks.models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'modified_at', 'is_completed')
    list_display_links = ('title',)
    list_editable = 'is_completed',