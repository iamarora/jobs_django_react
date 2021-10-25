from django.db.models import Count
from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins, views, viewsets
from rest_framework.response import Response

from djangoapp.models import Jobs, Skills
from djangoapp.serializers import JobsSerializer


class JobsViewSet(
    mixins.CreateModelMixin, mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer


class MostUsedSkillsView(views.APIView):

    @swagger_auto_schema(operation_description="Most used skills for posted jobs")
    def get(self, request):
        data = Skills.objects.annotate(
            jobs_count=Count('jobs')
        ).order_by('-jobs_count')[:5].values('name', 'jobs_count')
        return Response({"data": data})
