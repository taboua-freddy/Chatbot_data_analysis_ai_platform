import os

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.paginator import Paginator
from django.db.models import Sum, Max
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.http import Http404
from django.utils.datastructures import MultiValueDict
from rest_framework import generics, status, permissions, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from .models import User, Files
from .serializers import UserSerializer, FilesSerializer

from utils.format_response import AuthResponse, Payload, Pagination, Link, CustomResponse, ExtraData, FilesProperty


# Create your views here.

def _delete_file(path):
    """ Deletes file from filesystem. """
    if os.path.isfile(path):
        print("post delete", path)
        os.remove(path)


@receiver(post_delete, sender=Files)
def delete_file(sender, instance, *args, **kwargs):
    """ Deletes image files on `post_delete` """
    if instance.file_url:
        _delete_file(instance.file_url.path)


class FileView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Files.objects.all()

    def get(self, request: Request, id: int = None):
        data = {}
        if id is None:
            files_list = self.get_queryset().filter(owner_id=self.request.user.id).order_by("id")
            search = request.query_params.get("search") or None
            if search:
                files_list = files_list.filter(file_name__contains=search)

            sort_field = request.query_params.get("sort") or None
            order = request.query_params.get("order") or None
            if sort_field and order:
                order = "" if order == "asc" else "-"
                files_list = files_list.order_by(order + sort_field)

            try:
                page = int(request.query_params.get("page"))
                items_per_page = int(request.query_params.get("items_per_page"))
                paginator = Paginator(files_list, per_page=items_per_page)
                current_page = paginator.page(page)
            except:
                raise Http404("Query parameters do not match")

            pagination = Pagination(
                items_per_page=items_per_page,
                page=page,
                last_page=paginator.num_pages,
                first_page_url=f"/?page={paginator.page_range[0]}",
                last_page_url=f"/?page={paginator.num_pages}",
                total=paginator.count,
                from_=current_page.start_index(),
                to=current_page.end_index(),
            )
            prev_link = Link(label="&laquo; Previous", active=False)
            next_linK = Link(label="Next &raquo;", active=False)
            if current_page.has_previous():
                pagination.prev_page_url = f"/?page={current_page.previous_page_number()}"
                prev_link.url = pagination.prev_page_url
                prev_link.page = current_page.previous_page_number()
            if current_page.has_next():
                pagination.next_page_url = f"/?page={current_page.next_page_number()}"
                next_linK.url = pagination.next_page_url
                next_linK.page = current_page.next_page_number()

            links = [prev_link]

            for n_page in paginator.page_range:
                links.append(Link(
                    url=f"/?page={n_page}",
                    label=str(n_page),
                    active=(n_page == page),
                    page=n_page
                ))

            links.append(next_linK)

            pagination.links = links
            total_size = files_list.aggregate(sum=Sum("size")).get("sum")
            data = CustomResponse(
                data=FilesSerializer(current_page.object_list, many=True).data,
                payload=Payload(
                    pagination=pagination,
                    extra_data=ExtraData(
                        files_property=FilesProperty(
                            n_total_items=paginator.count,
                            total_size=total_size if total_size else 0
                        )
                    )
                )
            ).to_dict()

        else:
            file = get_object_or_404(Files.objects.all(), owner_id=self.request.user.id, pk=id)
            data = FilesSerializer(file).data
        return Response(data=data, status=status.HTTP_200_OK)

    def put(self, request: Request, id: int = None):
        files: MultiValueDict[str, list[InMemoryUploadedFile]] = self.request.FILES
        for name, _ in files.items():
            file = files.getlist(name)[0]
            f = dict(file_name=file.name,
                     owner=self.request.user.id,
                     extension=file.name.split(".")[1] or "",
                     size=file.size,
                     file_url=file,
                     )
            serializer = FilesSerializer(data=f)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

        serializer = FilesSerializer(Files.objects.filter(owner_id=self.request.user.id), many=True)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request: Request):
        _status = status.HTTP_200_OK

        serializer = FilesSerializer(Files.objects.filter(owner_id=self.request.user.id), many=True)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request: Request, id: int = None):

        file: Files = get_object_or_404(Files.objects.all(), owner_id=self.request.user.id, pk=id)
        file.delete()

        serializer = FilesSerializer(Files.objects.filter(owner_id=self.request.user.id), many=True)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]
    queryset = User.objects
    serializer_class = UserSerializer

    def post(self, request: Request):
        get_all = request.data.get("all") or False
        _id: int = request.data.get("id") or None

        if get_all and request.user.is_superuser:
            serializer = self.serializer_class(self.queryset.all(), many=True)
        if _id is not None and request.user.is_superuser:
            try:
                user = get_object_or_404(self.queryset, pk=_id)
            except:
                return Response({"errors": ["User not found"]}, status=status.HTTP_400_BAD_REQUEST)
            serializer = self.serializer_class(user)
        else:
            serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CheckToken(generics.GenericAPIView):
    permission_classes = []
    queryset = User.objects.prefetch_related("oauth2_provider_accesstoken")
    serializer_class = UserSerializer

    def get(self, request: Request, token: str):
        print(token)
        # token = "BA7BwbV1hJVXT8FC2rH0r6sEVCJdlf"
        # user = get_object_or_404(queryset=self.queryset, pk=4)
        # data = self.serializer_class(self.queryset.values(), many=True)
        # ser = RefreshTokenSerializer(RefreshToken.objects.prefetch_related("access_token"),many=True)
        try:
            user = get_object_or_404(self.get_queryset(), oauth2_provider_accesstoken__token=token)
        except:
            return Response({"errors": "Not found"}, status=status.HTTP_400_BAD_REQUEST)

        ser = self.get_serializer(user)
        return Response(ser.data, status=status.HTTP_200_OK)
