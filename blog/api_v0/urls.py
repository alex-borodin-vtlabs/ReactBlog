from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
router.register(r'articles', ArticleViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'auth/sign_in', obtain_auth_token),
    url(r'auth/sign_out', SignOut),
]
