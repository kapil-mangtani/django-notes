from django.views.generic import View
from simpleMsg.models import Message, MessageTag

class AddMessage(View):
    """
    Saves or updates a message for that user
    """
    def post(self, request):
        msg_title =  request.POST.get('title')
        msg_string = request.POST.get('msg')
        tags = request.POST.get('tags')
        msg, created = Message.objects.get_or_create(title=msg_title, body=msg_string, user=request.user)
        for tag in tags.split(' '):
            MessageTag.objects.get_or_create(tag=tag, message=msg)
            