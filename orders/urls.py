from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("logout/", views.logout_view, name="logout"),
    path("cart/", views.cart, name="cart"),
    path("order/", views.order_view, name="order"),
    path("placeorder/", TemplateView.as_view(template_name='placeorder.html')),
    path("placeorder/confirm/", views.confirm_order, name="confirm"),

    # path('scookie',views.setcookie),  
    # path('gcookie',views.getcookie),
    # path('dcookie',views.deletecookie)
]
