from django.contrib.auth.models import User, Group
from django.contrib import admin
from djangoapp.models import Jobs, Skills


# Register your models here.
admin.site.register(Jobs)
admin.site.register(Skills)


# De-Register models not required.
admin.site.unregister(Group)
admin.site.unregister(User)
