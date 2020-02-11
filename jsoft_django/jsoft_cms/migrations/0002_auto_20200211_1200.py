# Generated by Django 3.0.3 on 2020-02-11 12:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jsoft_cms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='date_begin',
            field=models.DateField(blank=True, default=datetime.date.today, null=True, verbose_name='Дата начала активности'),
        ),
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(blank=True, max_length=150, null=True, verbose_name='Заголовок h1 страницы'),
        ),
    ]
