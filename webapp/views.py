from django.shortcuts import render
import json
from .models import Blog

# Create your views here.
def home(request):
    blog_obj = Blog.objects.all().values('title','author','category','short_description','blog_image','blog_body')

    context = {
        'blogs' : list(blog_obj)
    }
    return render(request,'index.html',context)