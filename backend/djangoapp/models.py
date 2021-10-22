from django.db import models

from djangoapp.model_utils import BaseModel


# Create your models here.
class Jobs(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    skills = models.ManyToManyField('Skills')

    def __str__(self):
        return self.title

    class Meta:
        db_table = "jobs"
        verbose_name_plural = "jobs"
        ordering = ['-id']


class Skills(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "skills"
        verbose_name_plural = "skills"
        ordering = ['-id']
