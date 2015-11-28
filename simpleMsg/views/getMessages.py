from django.views.generic import View
from simpleMsg.models import Message
from django.shortcuts import render

class GetMessages(View):
    """
    Display all the messages for a User
    """
    template_name = 'messages.html'
    
    def get(self, request):
        messages = Message.objects.filter(user=request.user)
        context_dict = {'messages': messages}
        return render(request, self.template_name, context_dict)