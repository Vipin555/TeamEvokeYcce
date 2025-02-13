from rest_framework import serializers
from .models import Stock, Watchlist
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'symbol', 'name', 'current_price', 'change', 'volume', 'last_updated']

class WatchlistSerializer(serializers.ModelSerializer):
    stock = StockSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Watchlist
        fields = ['id', 'stock', 'user', 'added_at']
