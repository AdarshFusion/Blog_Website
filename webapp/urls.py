
from django.urls import path


from .views import blog_detail, home, blogs, trending, categories, authors, about, contact, blog_detail, category_blog


urlpatterns = [
    path('',home,name='home'),
    path('blogs',blogs,name='blogs'),
    path('trending',trending,name='trending'),
    path('categories',categories,name='categories'),
    path('authors',authors,name='authors'),
    path('about',about,name='about'),
    path('contact',contact,name='contact'),
    path('blog-detail/<int:pk>/',blog_detail,name='blog-detail'),
    path('category-blog/<str:cn>/',category_blog,name='category-blog'),

]
