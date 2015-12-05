from django.views.generic import View
from simpleMsg.models import Message
from django.shortcuts import render

class TestMessages(View):
    """
    testing
    """
    template_name = 'messages.html'
    
    def get(self, request):
        return render(request, self.template_name, {})