import uuid

from django.core.files.uploadedfile import InMemoryUploadedFile

from Api_rest import settings
from rest_framework.exceptions import ValidationError


def exclude_fields(obj: object, excluded_fields: list[str]):
    fields = list(obj.__dict__.keys())
    return [field for field in fields if field not in excluded_fields]


def upload_to(instance, filename: str):
    uuid_ = uuid.uuid4()
    extension = ("." + filename.split(".")[1]) if filename.__contains__(".") else ""
    return f'files/user_{instance.owner.id}/{uuid_}{extension}'


def validate_file_size(value: int):
    file_size = int(value)
    limit_bytes = settings.FILE_UPLOAD_MAX_MEMORY_SIZE
    if file_size > limit_bytes:
        raise ValidationError("Max size of file is %s " % str(limit_bytes))


def validate_file_extension(file: InMemoryUploadedFile):
    filename = file.name
    extension = ("." + filename.split(".")[1]) if filename.__contains__(".") else ""
    if extension not in settings.EXTENSION_ALLOWED:
        raise ValidationError("Provide a valide extension see %s " % str(settings.EXTENSION_ALLOWED))

    validate_file_size(file.size)
