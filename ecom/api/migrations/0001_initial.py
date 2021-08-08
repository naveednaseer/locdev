from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="naveed",
                          email= "naveed99@gmail.com",
                          is_staff= True,
                          is_superuser= True,
                          phone= '9876543219',
                          gender= 'Male',
                         )

        user.set_password('naseer99')
        user.save()


        dependencies = [

    ]


    operations = [
        migrations.RunPython(seed_data),
    ]