from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(CompanyProfile)
admin.site.register(IndividualProfile)
admin.site.register(Announcement)

