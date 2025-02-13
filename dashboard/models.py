from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from djongo import models as djongo_models

class Stock(djongo_models.Model):
    symbol = djongo_models.CharField(max_length=10, unique=True)
    name = djongo_models.CharField(max_length=255)
    current_price = djongo_models.DecimalField(max_digits=10, decimal_places=2)
    change = djongo_models.DecimalField(max_digits=10, decimal_places=2)
    volume = djongo_models.IntegerField()
    last_updated = djongo_models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.symbol} - {self.name}"

    class Meta:
        ordering = ['symbol']

class Watchlist(djongo_models.Model):
    user = djongo_models.ForeignKey(User, on_delete=models.CASCADE)
    stock = djongo_models.ForeignKey(Stock, on_delete=models.CASCADE)
    added_at = djongo_models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'stock')
        ordering = ['-added_at']

    def __str__(self):
        return f"{self.user.username}'s watchlist - {self.stock.symbol}"