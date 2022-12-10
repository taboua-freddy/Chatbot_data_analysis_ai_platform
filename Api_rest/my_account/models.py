import uuid

from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.utils import timezone

from Api_rest import settings
from utils.models_utils import upload_to, validate_file_size, validate_file_extension
from .managers import UserManager


# Create your models here.


class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    username = models.CharField(
        _("username"),
        max_length=150,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
        blank=True
    )
    email = models.EmailField(
        _("email address"),
        unique=True,
        error_messages={
            "unique": _("A user with that email already exists."),
        }
    )
    objects = UserManager()
    date_of_birth = models.DateField(blank=True)
    occupation = models.CharField(max_length=150, null=True)
    companyName = models.CharField(max_length=150, null=True)
    phone = models.CharField(max_length=150, blank=True)
    # roles= models.CharField(max_length=150,blank=True)
    pic = models.ImageField(blank=True, null=True)
    language = models.Choices(names=['en', 'de', 'es', 'fr', 'ja', 'zh', 'ru'], value="en")
    timeZone = models.CharField(max_length=150, blank=True)
    website = models.CharField(max_length=150, blank=True)
    # oauth2_provider_accesstoken = models.ManyToOneRel(to=RefreshToken, related_name="user", field="user",
    #                                                  field_name="user_id")
    # Communication = models.OneToOneRel(to=settings.COM, field="user", field_name="email")


class Communication(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    email = models.BooleanField(default=False)
    sms = models.BooleanField(default=False)
    phone = models.BooleanField(default=False)


class Address(models.Model):
    addressLine = models.CharField(max_length=150, null=True)
    city = models.CharField(max_length=50, null=True)
    state = models.CharField(max_length=50, null=True)
    postCode = models.CharField(max_length=50, null=True)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)


class SocialNetworks(models.Model):
    linkedIn = models.CharField(max_length=50, null=True)
    facebook = models.CharField(max_length=50, null=True)
    twitter = models.CharField(max_length=50, null=True)
    instagram = models.CharField(max_length=50, null=True)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)


class Files(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Files")
    file_name = models.CharField(max_length=80, blank=False, null=False)
    size = models.TextField(max_length=80, validators=[validate_file_size])
    extension = models.TextField(max_length=80)
    created_at = models.DateTimeField(default=timezone.now)
    file_url = models.FileField(upload_to=upload_to, verbose_name="file", validators=[validate_file_extension])
