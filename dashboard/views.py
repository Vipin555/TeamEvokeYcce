from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Stock, Watchlist
from .serializers import StockSerializer, WatchlistSerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class WatchlistViewSet(viewsets.ModelViewSet):
    serializer_class = WatchlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        stock_id = self.request.data.get('stock')
        stock = get_object_or_404(Stock, id=stock_id)
        serializer.save(user=self.request.user, stock=stock)

    @action(detail=False, methods=['GET'])
    def my_watchlist(self, request):
        watchlist = self.get_queryset()
        serializer = self.get_serializer(watchlist, many=True)
        return Response(serializer.data)