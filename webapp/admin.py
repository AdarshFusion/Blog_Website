from django.contrib import admin

from .models import Category, Blog

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','category_name','created_at','updated_at')

class BlogAdmin(admin.ModelAdmin):
    list_display = ('id','title',)
    prepopulated_fields = { 'slug' : ('title',)}
    search_fields = ('id','title','status','category')
    # list_editable = ('is_feacherd',)

admin.site.register(Category,CategoryAdmin)
admin.site.register(Blog,BlogAdmin)
