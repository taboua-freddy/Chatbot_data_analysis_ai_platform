# Generated by Django 4.1.3 on 2022-12-02 03:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0002_files'),
    ]

    operations = [
        migrations.RenameField(
            model_name='files',
            old_name='image_url',
            new_name='file_url',
        ),
    ]
