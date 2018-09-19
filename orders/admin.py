from django.contrib import admin
from .models import Menu, Customer, OrderDetails, OrderedItems

admin.site.register(Customer)
admin.site.register(Menu)
admin.site.register(OrderDetails)
admin.site.register(OrderedItems)
