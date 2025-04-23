from django.urls import path
from .views import (
    register_user,
    protected_view,
    book_list,
    book_detail  # ✅ Import this to avoid errors
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    # Auth routes
    path('register/', register_user, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Protected user info
    path('protected/', protected_view, name='protected'),

    # Book routes
    path('books/', book_list, name='book-list'),
    path('books/<int:pk>/', book_detail, name='book-detail'),  # ✅ Book detail: GET, PUT, DELETE
]
