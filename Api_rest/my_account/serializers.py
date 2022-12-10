from abc import ABC

from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

from .models import User, Files


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = "__all__"
        # exclude = ["owner"]


class UserSerializer(serializers.ModelSerializer):
    # oauth2_provider_accesstoken = AccessTokenSerializer(read_only=True, many=True)

    class Meta:
        model = User
        depth = 1
        exclude = ["password", "is_superuser", "is_active"]


class MyRegisterSerializer(RegisterSerializer):
    password2 = serializers.CharField(required=False)

    def validate(self, data):
        return data

    def save(self):
        email = self.validated_data['email']
        message = self.validated_data['message']
        # send_email(from=email, message = message)
