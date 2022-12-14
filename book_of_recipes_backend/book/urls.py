from django.urls import path

from .views import CategoryListAPIView, CategoryRetrieveAPIView, RecipeRetrieveAPIView


urlpatterns = [
    path('', CategoryListAPIView.as_view()),
    path('category/<int:pk>/', CategoryRetrieveAPIView.as_view()),
    path('recipe/<int:pk>/', RecipeRetrieveAPIView.as_view()),
]
