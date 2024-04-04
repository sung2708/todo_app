from django.shortcuts import render, redirect

# Create your views here.
from .models import Task, User
from .forms import TaskForm, UserForm

def index(request):
    task = Task.objects.all()
    form = TaskForm()
    user = User.objects.get(id=1)
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('/')
    
    context = {'task': task, 'form': form, 'user': user}
    return render(request, 'todo/home.html', context)

def detail(request, pk):
    item = Task.objects.get(id=pk)
    form = TaskForm(instance=item)

    if request.method == 'POST':
        form = TaskForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
            return redirect('/')

    if request.method == 'POST':
        item.delete()
        return redirect('/')
    
    context = {'item':item, 'form': form} 
    return render(request, 'todo/detail.html', context)
