from django.contrib import admin
from .models import Menu, Customer, OrderDetails, OrderedItems
# Register your models here.

admin.site.register(Customer)
admin.site.register(Menu)
admin.site.register(OrderDetails)
admin.site.register(OrderedItems)
