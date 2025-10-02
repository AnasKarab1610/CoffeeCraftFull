from django.db import models

# Create your models here.
class Bui(models.Model):
    name = models.CharField(max_length=255)
    category = models.TextField()
    imgs = models.ImageField(upload_to='static/images/', default='static/images/default.jpg')
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date_added'] 

