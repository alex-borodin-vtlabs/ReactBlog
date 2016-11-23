from rest_framework import viewsets
from .serializers import *
from rest_framework import parsers, renderers
from rest_framework_expiring_authtoken.models import ExpiringToken
from rest_framework.response import Response
from rest_framework.views import APIView


from django.contrib.auth.models import User
from rest_framework import status

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
   queryset = Article.objects.all()

   def get_serializer_class(self):
       if self.action == 'list':
           return ArticlePreviewSerializer
       return ArticleDetailSerializer

class ObtainAuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer
    model = ExpiringToken

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            token, _ = ExpiringToken.objects.get_or_create(
                user=serializer.validated_data['user']
            )

            if token.expired():
                # If the token is expired, generate a new one.
                token.delete()
                token = ExpiringToken.objects.create(
                    user=serializer.validated_data['user']
                )
        return Response({'access-token': token.key})



class SignOut(APIView):
    queryset = User.objects.all()

    def delete(self, request, format=None):
        # simply delete the token to force a login
        token, _ = ExpiringToken.objects.get_or_create(
                token=request['access-token']
            )
        token.delete()
        return Response(status=status.HTTP_200_OK)

obtain_auth_token = ObtainAuthToken.as_view()
