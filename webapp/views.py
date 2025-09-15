import re
from unicodedata import category
from django.core.serializers import serialize
from django.db.models import Count
from django.shortcuts import render
import json
from .models import Blog, Category
from django.db.models import F


# Create your views here.
def home(request):
    # blog_obj     = Blog.objects.all().values('id','title','author','category','short_description','blog_image','blog_body')
    category_obj = Category.objects.all().values_list("category_name", flat=True).distinct()
    
    # Trending blogs (latest 3 for now)
    trending_blogs = Blog.objects.all().order_by('-id')[:3]  
    
    # Top author by number of blogs
    top_author = Blog.objects.values('author').annotate(total=Count('id')).order_by('-total').first()
    top_author_blogs = []
    if top_author:
        # Limit to only 2 blogs
        top_author_blogs = list(
            Blog.objects.filter(author=top_author['author'])
            .values('id', 'title', 'short_description', 'blog_image', 'category')[:2]  # ✅ only 2 blogs
        )

    context = {
        # 'blogs': list(blog_obj),
        'category': list(category_obj),
        'trending_blogs': trending_blogs,
        'top_author': top_author,
        'top_author_blogs': top_author_blogs,
    }

    # print(context['top_author_blogs'])
    return render(request,'index.html',context)


def blog_detail(request,pk):
    blog_obj = Blog.objects.get(id=pk)

    context = {
        'blog_detail' : blog_obj,
    }

    return render(request,'blog-detail.html',context)

def blogs(request):

    blog_obj = Blog.objects.select_related("author", "category").all().values('id','title','views','short_description','blog_image','blog_body',created_date=F("created_at__date"),author_name=F("author__username"),category_name=F("category__category_name"))

    
    context = {
        'blogs': list(blog_obj),
    }

    return render(request,'blogs.html',context)


def trending(request):
    # Trending blogs (latest 3 for now)
    trending_blogs = Blog.objects.all().order_by('-id')[:3]  
    
    context = {
        'trending_blogs': trending_blogs,
    }

    return render(request,'trending.html',context)


def categories(request):
    category_obj = Category.objects.all()

    context = {
        'category': category_obj,
    }

    # print(context['category'])
    return render(request,'categories.html',context)

def category_blog(request,cn):
    
    blog_obj = Blog.objects.filter(category__category_name=cn)

    context = {
        'blog' : blog_obj,
    }

    return render(request,'category-blog.html',context)


def authors(request):
    return render(request,'authors.html')


def about(request):
    return render(request,'about.html')


def contact(request):
    return render(request,'contact.html')
