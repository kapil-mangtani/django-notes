from django.views.generic import View
from simpleMsg.models import Message
from django.http.response import HttpResponse
import json

class GetMessages(View):
    """
    Display all the messages for a User
    """
    
    def get(self, request):
        """
        Retrieves all messages with tags for this user
        """
        messages = Message.objects.filter(user=request.user)
        data = []
        for message in messages:
            data_dict = {'title' : message.title, 'body': message.body}
            tags = message.messagetag_set.all().values_list('tag', flat=True)
            #note the list() call below, it is intended not to force evaluation
            #of the queryset but because django querysets are not serializable 
            #and hence converted to list
            data_dict['tags'] = list(tags)
            data.append(data_dict)
        return HttpResponse(json.dumps(data))