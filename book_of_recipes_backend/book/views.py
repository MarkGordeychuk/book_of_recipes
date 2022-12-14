from rest_framework import generics
from django.db.models import Prefetch

from .models import Category, Recipe, Step
from .serializers import CategorySerializer, CategoryRetrieveSerializer, RecipeRetrieveSerializer


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.prefetch_related('recipes')
    serializer_class = CategoryRetrieveSerializer


class RecipeRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Recipe.objects.select_related('category')\
        .prefetch_related(
            Prefetch('steps', queryset=Step.objects.order_by('step_num')),
            'ingredient_set',
        )
    serializer_class = RecipeRetrieveSerializer
