from django.urls import path

from . import views

urlpatterns = [
    path('', views.HomePageView.as_view()),
    path('<slug:slug>/', views.DetaiPagelView.as_view(), name='page_url')
]