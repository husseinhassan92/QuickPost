from rest_framework import serializers
from comment.api.serlizer import CommentSerializer
from accounts.serializers import UserAccountSerializer
from profile.serializer import ProfileSerializer
from reaction.serializers import ReactionSerializer
from ..models import Post, SharePost

class PostSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"




class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    comments_count = serializers.SerializerMethodField()
    reaction_count =  serializers.SerializerMethodField()
    profile = ProfileSerializer()
    p_author = UserAccountSerializer(read_only=True)
    happy_count = serializers.SerializerMethodField()
    sad_count = serializers.SerializerMethodField()
    love_count = serializers.SerializerMethodField()
    dislike_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    share_count = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = "__all__"
    
    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_reaction_count(self,obj):
        return obj.reactions.count()
    
    def get_happy_count(self, obj):
        return obj.reactions.filter(reaction_type='😄').count()

    def get_sad_count(self, obj):
        return obj.reactions.filter(reaction_type='😢').count()

    def get_love_count(self, obj):
        return obj.reactions.filter(reaction_type='❤️').count()

    def get_dislike_count(self, obj):
        return obj.reactions.filter(reaction_type='👎').count()

    def get_like_count(self, obj):
        return obj.reactions.filter(reaction_type='👍').count()
    
    def get_share_count(self, obj):
        return obj.share_post.count()




class ShareSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = SharePost
        fields = "__all__"

class ShareSerializer(serializers.ModelSerializer):
    post = PostSerializer(read_only=True)
    class Meta:
        model = SharePost
        fields = "__all__"
        depth=1