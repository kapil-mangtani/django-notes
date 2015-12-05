from django.views.generic import View

class SearchMessage(View):
    """
    Perform searches on messages for that user
    """
    def post(self, request):
        pass