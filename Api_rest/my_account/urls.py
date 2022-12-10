from django.conf import settings
from django.conf.urls.static import static
from django.template.defaulttags import url
from django.urls import path, include, re_path
from tastypie.api import Api

from .views import UserView, FileView

v1_api = Api(api_name="v1")
# v1_api.register(UserResource())

urlpatterns = [
    path("user/", UserView.as_view()),
    re_path(r'^files/(?P<id>\d+)/$', FileView.as_view()),
    re_path(r'^files/', FileView.as_view()),  # $
    path('auth/', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    # path('', include(v1_api.urls)),
]  # + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
