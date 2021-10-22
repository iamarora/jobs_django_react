import json

from django.test import Client,TestCase
from django.urls import reverse
from rest_framework import status


client = Client()

     
class CreateJobsTest(TestCase):
    def setUp(self):
        self.valid_payload = {
            "title": "Job title",
            "description": "Job desc",
            "skills": [
                {
                   "name": "Skill 1"
                },
                {
                   "name": "Skill 2"
                }
            ]
        }
        self.invalid_payload = {
            "title": "",
            "description": "Job desc",
            "skills": [
                {
                   "name": "Skill 1"
                },
                {
                   "name": "Skill 2"
                }
            ]
        }

    def test_create_valid_job(self):
        response = client.post(
            reverse('jobs-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_job(self):
        response = client.post(
            reverse('jobs-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_jobs(self):
        response = client.get(
            reverse('jobs-list')
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_missing_job(self):
        response = client.get(
            reverse('jobs-detail', kwargs={'pk': -1})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_most_used_skills(self):
        response = client.get(
            reverse('most_used_skills')
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
