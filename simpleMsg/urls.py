from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from simpleMsg.views import getMessages, addMessage, test
from django.conf import settings


urlpatterns = patterns('',

    url(r'^add/$', login_required(addMessage.AddMessage.as_view(), login_url=settings.LOGIN_URL), name='add'),
    url(r'^all-messages/$', login_required(getMessages.GetMessages.as_view(), login_url=settings.LOGIN_URL), name='get-all-messages'),
    url(r'^test/$', login_required(test.TestMessages.as_view(), login_url=settings.LOGIN_URL), name='test'),
)