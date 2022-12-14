from rest_framework import serializers

from .models import Category, Recipe, Step, RecipeIngredient


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class RecipeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        exclude = ('ingredient_set', 'category', )


class CategoryRetrieveSerializer(serializers.ModelSerializer):
    recipes = RecipeListSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = serializers.StringRelatedField()

    class Meta:
        model = RecipeIngredient
        fields = ('ingredient', 'amount', )


class StepListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ('step_num', 'content', )


class RecipeRetrieveSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    ingredients = RecipeIngredientSerializer(many=True, read_only=True)
    steps = StepListSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        exclude = ('ingredient_set', )
