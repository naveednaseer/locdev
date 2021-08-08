@csrf_exempt
def signin (request):
    if not request.method == 'POST':
        return JsonResponse({'error' : 'Send a post request with valid parameters'})
        

    username = request.POST['email']
    password = request.POST['password']

    # Validation checks 
    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({'error': 'Enter a valid email'})
 
    if len(password) < 6:
        return JsonResponse({'error': 'Password must be at least 6 characters'})

        UserModel = get_user_model()


        try:
            user = UserModel.objects.get(email=username)

            if user.check_password(password):
                user_dict = UserModel.objects.filter(email=username).values().first()
                user_dict.pop('password')

                if user.session_token != "0":
                    user.session_token = "0"
                    user.save()
                    return JsonResponse({'error': 'Previous session already exists'})

                token = generate_session_token()
                user.session_token = token
                user.save()
                login(request, user)
                return JsonResponse({'token': token, 'user': user_dict})

            else:
                return JsonResponse({'error': 'Invalid password'})

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'Invalid user details'})

