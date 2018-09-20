from .models import Menu, Customer, OrderDetails, OrderedItems
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.models import User
from django.http import JsonResponse
import json


def cart(request):
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


def order_view(request):
    if request.method == 'POST':
        # import pdb; pdb.set_trace()
        obj = json.loads(request.POST['data'])
        response = JsonResponse({'message': 'Redirecting...'})
        for i in range(len(obj)):
            response.set_cookie('item-details' + str(i), str(obj[i]['item_id']) + '--' + (obj[i]['item_name']) + '--' + str(obj[i]['quantity']) + '--' + str(obj[i]['bill']))
        # import pdb; pdb.set_trace()
        return response
    else:
        return JsonResponse({'Invalid request': "Go get some sleep"})


def confirm_order(request):
    if request.method == 'POST':
        obj = json.loads(request.POST['data'])
        # import pdb; pdb.set_trace()
        c = Customer.objects.get(username=request.user)
        o = OrderDetails(c_id=c, address=obj['info']['addr'], amount=obj['info']['total'])
        o.save()
        o_lat = OrderDetails.objects.latest('order_id')
        response = JsonResponse({'message': 'Order Placed'})
        for i in range(len(obj) - 1):
            menu_item = Menu.objects.get(item_id=int(obj[str(i)]['item_id']))
            item = OrderedItems(o_id=o_lat, i_id=menu_item, quantity=int(obj[str(i)]['quantity'])) 
            item.save()
            response.delete_cookie('item-details' + str(i))
        return response
    else:
        return JsonResponse({'Invalid request': "Go get some sleep"})


def deletecookie(request):
    if request.method == 'POST':
        n = request.POST["len"]
        # import pdb; pdb.set_trace()
        response = JsonResponse({'message': 'Cart Cleared'})
        for i in range(int(n)):
            response.delete_cookie('item-details' + str(i))
    return response

# def setcookie(request):
#     response = HttpResponse("Cookie Set")
#     response.set_cookie('java-tutorial', 'javatpoint.com')
#     return response


# def getcookie(request):
#     tutorial  = request.COOKIES['java-tutorial']
#     return HttpResponse("java tutorials @: "+  tutorial);
