# Generated by Django 5.0.2 on 2024-03-13 10:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_reaction_reaction_type'),
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reaction',
            name='post_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='post.post'),
        ),
    ]