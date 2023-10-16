from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView

from django.urls import path
from Account import views



urlpatterns = [
    path('register/', views.UserRegistartionView.as_view(), name="UserRegistartionView"),
    path('login/', views.UserloginView.as_view(), name="Userlogin"),
    path('profile/', views.UserProfileView.as_view(), name="Userprofile"),
    path('changepassword/', views.ChangeUserPAsswordView.as_view(), name="changepassword"),
    path('sendpasswordresetlink/', views.SendPasswordResetEmailView.as_view(), name="sendpasswordresetlink"),
    path('reset/<uid>/<token>', views.UserPasswordResetView.as_view(), name="passwordreset"),


    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]