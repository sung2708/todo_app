from django.shortcuts import render, redirect

# Create your views here.
from .models import Task
from .forms import TaskForm

def index(request):
    task = Task.objects.all()
    form = TaskForm()

    if request.method == 'POST':
        if form.is_valid():
            form.save()
        return redirect('/')
    
    context = {'task': task, 'form': form}
    return render(request, 'todo/home.html', context)

def updateTask(request, pk):
    task = Task.objects.get(id=pk)
    form = TaskForm(instance=task)

    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('/')
    
    context = {'form': form}
    return render(request, 'todo/update.html', context)

def deleteTask(request, pk):
    item = Task.objects.get(id=pk)

    if request.method == 'POST':
        item.delete()
        return redirect('/')
    
    context = {'item':item}   
    return render(request, 'todo/delete.html', context)