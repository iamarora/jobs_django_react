from rest_framework import serializers

from djangoapp.models import Jobs, Skills


class SkillsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Skills
        fields = ['name']


class JobsSerializer(serializers.ModelSerializer):
    skills = SkillsSerializer(many=True, required=False)

    def create(self, validated_data):
        skills = validated_data.pop('skills', [])
        jobs = super(JobsSerializer, self).create(validated_data)
        db_skills = []
        for skill in skills:
            if skill.get("name") and skill["name"]:
                skill_obj, _created = Skills.objects.get_or_create(name=skill['name'])
                db_skills.append(skill_obj)
        jobs.skills.add(*db_skills)
        return jobs

    class Meta:
        model = Jobs
        fields = ['title', 'description', 'skills']
