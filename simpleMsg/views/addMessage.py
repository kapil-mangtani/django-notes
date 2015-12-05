from django.views.generic import View
from simpleMsg.models import Message, MessageTag
from django.http.response import HttpResponse
import json

class AddMessage(View):
    """
    Saves or updates a message for that user
    """
    
    def post(self, request):
        data = json.loads(request.body)
        msg_title =  data['title']
        msg_string = data['msg']
        tags = data['tags']
        msg, created = Message.objects.get_or_create(title=msg_title, body=msg_string, user=request.user)
        for tag in tags:
            tag, new = MessageTag.objects.get_or_create(tag=tag)
            tag.message.add(msg)
        msg_count = Message.objects.count()
        return HttpResponse(msg_count, status=200)
    
    