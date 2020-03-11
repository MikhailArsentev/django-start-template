from django.shortcuts import render
from django.views.generic.base import View
from django.views.generic import ListView, DetailView

from .models import Page

class HomePageView(View):
    def get(self, request):
        pages = Page.objects.all()
        return render(request, 'jsoft_cms/home_page.html', {'home_page': pages})

# class NewsView(ListView):
#     model = Page
#     queryset = Page.objects.filter(active=True)
#     context_object_name = 'page'
#     template_name = 'jsoft_cms/news_list.html'

# class NewsDetaiView(DetailView):
#     model = Page
#     slug_field = 'url'
#     context_object_name = 'page'
#     template_name = 'website/news/news_detail.html'