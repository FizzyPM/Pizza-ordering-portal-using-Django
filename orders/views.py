from .models import Menu, Customer
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.models import User


def menu(request):
    context = {
        "items": Menu.objects.all()
    }
    return render(request, "menu.html", context)


def index(request):
    if not request.user.is_authenticated:
        return render(request, "login.html", {"message": None})
    context = {
        "user": request.user,
        "items": Menu.objects.all()
    }
    return render(request, "menu.html", context)


def login_view(request):
    username = request.POST["uname"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "login.html", {"message": "Invalid credentials."})


def register_view(request):
    username = request.POST["uname"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        return render(request, "login.html", {"message": "User already registered"})
    else:
        fname = request.POST["fname"]
        lname = request.POST["lname"]
        email = request.POST["email"]
        pnumber = request.POST["pnumber"]
        user = User.objects.create_user(username, email, password)
        user.first_name = fname
        user.last_name = lname
        c = Customer(first_name=fname, last_name=lname, username=username, password=password, email=email, phone_no=pnumber)
        c.save()
        login(request, user)
        return HttpResponseRedirect(reverse("index"))


def logout_view(request):
    logout(request)
    return render(request, "login.html", {"message": "Logged out."})
