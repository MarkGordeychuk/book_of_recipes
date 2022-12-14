from django.contrib import admin

from .models import Category, Recipe, Step, Ingredient, RecipeIngredient


class IngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1


class StepInline(admin.TabularInline):
    model = Step


class RecipeAdmin(admin.ModelAdmin):
    inlines = (IngredientInline, StepInline, )


admin.site.register(Category)
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Step)
admin.site.register(Ingredient)
