from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=255)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    change = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.BigIntegerField()
    last_updated = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.symbol} - {self.name}"

    class Meta:
        ordering = ['symbol']

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlists')
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, related_name='watchlists')
    added_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'stock')
        ordering = ['-added_at']

    def __str__(self):
        return f"{self.user.username}'s watchlist - {self.stock.symbol}"