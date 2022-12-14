from django.db import models

from .utils import generate_recipe_image_path


class Category(models.Model):
    name = models.CharField(max_length=64)

    def __repr__(self):
        return f"<Category: {self.name}>"

    def __str__(self):
        return f"{self.name}"


class Ingredient(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"{self.name}"


class Recipe(models.Model):
    name = models.CharField(max_length=64)
    image = models.ImageField(null=True, blank=True, upload_to=generate_recipe_image_path)
    description = models.TextField()
    cooking_time = models.PositiveSmallIntegerField()  # in minutes
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='recipes')
    ingredient_set = models.ManyToManyField(Ingredient, through='RecipeIngredient')

    def __repr__(self):
        return f"<Recipe: {self.name} Category: {self.category.name}>"

    def __str__(self):
        return f"{self.name}"


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.PROTECT)
    amount = models.CharField(max_length=32)

    class Meta:
        unique_together = [['recipe', 'ingredient'], ]


class Step(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='steps')
    step_num = models.PositiveSmallIntegerField()
    content = models.TextField()

    def __repr__(self):
        return f"<Step {self.step_num} Recipe: {self.recipe.name} Category: {self.recipe.category.name}>"

    def __str__(self):
        return f"Step Num. {self.step_num} of recipe \"{self.recipe.name}\""

    class Meta:
        unique_together = [['recipe', 'step_num']]
