from django.shortcuts import render
# from django.views.generic.base import View
from django.views.generic import ListView, DetailView

from .models import Page


class HomePageView(ListView):
    model = Page
    queryset = Page.objects.filter(active=True)
    context_object_name = 'page'
    template_name = 'website/home_page.html'

class DetaiPagelView(DetailView):
    model = Page
    slug_field = 'url'
    context_object_name = 'page'
    template_name = 'website/page_detail.html'

"""
# способ вывода списка для view
class HomePageView(View):
    def get(self, request):
        pages = Page.objects.all()
        return render(request, 'website/home_page.html', {'home_page': pages})

# способ вывода деталки для View
class DetaiPagelView(View):
    def get(self, request, slug):
        detail_page = Page.objects.get(url=slug)
        return render(request, 'website/page_detail.html', {'detail_page': detail_page})
"""