from django.db import models


# Create your models here.
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=10)
    email = models.CharField(max_length=64)
    phone_no = models.CharField(max_length=12)

    def __str__(self):
        return f"{self.username}({self.customer_id})"


class Menu(models.Model):
    item_id = models.PositiveIntegerField(primary_key=True)
    item_name = models.CharField(max_length=64)
    item_price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.item_name} @ Rs{self.item_price}.00/-"


class OrderDetails(models.Model):
    order_id = models.AutoField(primary_key=True)
    c_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=250)
    amount = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Order no. {self.order_id} by {self.c_id}"


class OrderedItems(models.Model):
    o_id = models.ForeignKey(OrderDetails, on_delete=models.CASCADE)
    i_id = models.ForeignKey(Menu, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.o_id} has {self.i_id} X {self.quantity}"
