from django.views.generic import View
from simpleMsg.models import Message, MessageTag
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
    
    
    def post(self, request):
        """
        This method is intended to serve the purpose of performing searches
        based on tags
        """
        data = json.loads(request.body)
        search_string = data['search']
        tag = MessageTag.objects.get(tag=search_string)
        data = []
        results = tag.message.filter(user=request.user)
        for result in results:
            data_dict = {'title' : result.title, 'body': result.body}
            data.append(data_dict)
        
        return HttpResponse(json.dumps(data))
        