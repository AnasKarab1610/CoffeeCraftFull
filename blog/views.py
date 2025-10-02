from django.shortcuts import render
from .models import Bui

# Create your views here.


def index(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about/index.html')

def build(request):
    beans = Bui.objects.filter(category='beans')
    roast = Bui.objects.filter(category='roast')
    Prepare = Bui.objects.filter(category='Prepare')
    heat = Bui.objects.filter(category='heat')
    Fluids = Bui.objects.filter(category='Fluids')
    Sweeteners = Bui.objects.filter(category='Sweeteners')
    Flavors = Bui.objects.filter(category='Flavors')
    ontop = Bui.objects.filter(category='ontop')
    size = Bui.objects.filter(category='size')
    art = Bui.objects.filter(category='art')

    return render(request, 'build/index.html' , {
        'beans': beans,
        'roast': roast,
        'Prepare': Prepare,
        'heat': heat,
        'Fluids': Fluids,
        'Sweeteners': Sweeteners,
        'Flavors': Flavors,
        'ontop': ontop,
        'size': size,
        'art': art,
    })

def contact(request):
    return render(request, 'contact/index.html')