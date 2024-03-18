from rest_framework import serializers 
from profile.serializer import ProfileSerializer 
from .models import ChatMessage

class MessageSerializer(serializers.ModelSerializer):
    reciever_profile = ProfileSerializer(read_only=True)
    sender_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'reciever', 'reciever_profile', 'sender_profile', 'message', 'is_read', 'date']
    
    def __init__(self, *args, **kwargs):
        super(MessageSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.reciever_profile.depth = 0
            self.sender_profile.depth = 0
