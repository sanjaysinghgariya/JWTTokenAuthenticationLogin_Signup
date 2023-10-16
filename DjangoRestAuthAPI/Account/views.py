from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from Account.serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer,UserChangePasswordSerializer,SendPasswordResetEmailSerializer,UserPasswordResetSerializer
from django.contrib.auth import authenticate
from Account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import json


#Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }



class UserRegistartionView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({"token":token, 'msg':"Registration Successful"},status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserloginView(APIView):
    renderer_class = [UserRenderer]
    def post(self, request, format=None):
        
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
                email = serializer.data.get('email')
                password = serializer.data.get('password')
                user = authenticate(email=email, password=password)
                if user is not None:
                        token = get_tokens_for_user(user)
                        return Response({"token":token, 'msg':"login Successful"},status=status.HTTP_200_OK)
                else:
                        return Response({'error':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    renderer_class = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

            
class ChangeUserPAsswordView(APIView):
    renderer_class = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        print("request.data", request.POST)
        
        serializer = UserChangePasswordSerializer(data=request.data, context= {'user':request.user})
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            return Response({"msg":"Password Changed Successful"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




class SendPasswordResetEmailView(APIView):
    renderer_class = [UserRenderer]

    def  post(self, request, format=None):
        print("request.data", request.data)
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({"msg":"password reset link sent please check your email Email"}, status=status.HTTP_200_OK)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

             
class UserPasswordResetView(APIView):
        renderer_class = [UserRenderer]
        def  post(self, request, uid, token, format=None):
            serializer =  UserPasswordResetSerializer(data=request.data, context ={
                'uid':uid, 'token':token})
            if serializer.is_valid(raise_exception=True):
                return Response({"msg":"Password Changed Successful"}, status=status.HTTP_200_OK)
        
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    