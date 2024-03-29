from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        db_table = 'db_task'
        verbose_name_plural = 'Tasks'
