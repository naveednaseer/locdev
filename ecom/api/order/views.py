from django.contrib.auth.backends import UserModel
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'please re-login', 'code': '500'})

    if request.method == "POST" :
        user_id = id
        transaction_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['products']

        total_products = len(products.split(',')[:-1])
        UserModel = get_user_model()

        try:
            user = User.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        
        ordr = Order(user=user, product_names=products, total_products=total_products, transaction_id=transaction_id, total_amount=amount)
        ordr.save()
        return JsonResponse({'success': True, 'error': False, 'msg': 'Order placed successfully'})


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer



    