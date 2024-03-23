from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ReportSerializer


# Create your views here.
@api_view(['POST'])
def add_report(request):
    report = ReportSerializer(data=request.data)
    if report.is_valid():
        report.save()
        return Response(report.data, status=201)
    else:
        return Response(report.errors, status=400)