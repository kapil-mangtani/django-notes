from django.db import models
from django.conf import settings

# Create your models here.
class Base(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    
    class Meta:
        abstract = True

class Message(Base):
    title = models.CharField(max_length=255)
    body = models.TextField()
    favourite = models.BooleanField(default=False)
    
    def __unicode__(self):
        return self.body

    
class MessageTag(models.Model):
    tag = models.CharField(max_length=50)
    #manytomany relationship --> one message can have many tags and vice versa
    message = models.ManyToManyField(Message)
    
    def __unicode__(self):
        return self.tag
    
    class Meta:
        ordering = ('tag',)