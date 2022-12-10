import dataclasses
from dataclasses import dataclass, field
from typing import Optional

from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
class Link:
    label: str
    active: bool
    url: str = None
    page: int = None


@dataclass_json
@dataclass
class Pagination:
    first_page_url: str
    last_page_url: str
    from_: int
    page: int
    items_per_page: int
    last_page: int
    to: int
    total: int
    next_page_url: str = None
    prev_page_url: str = None
    links: Optional[list[Link]] = None


@dataclass_json
@dataclass
class FilesProperty:
    total_size: int
    n_total_items: int


@dataclass_json
@dataclass
class ExtraData:
    files_property: Optional[FilesProperty] = None


@dataclass_json
@dataclass
class Payload:
    message: Optional[str] = None
    errors: Optional[dict[str, list]] = None
    pagination: Optional[Pagination] = None
    extra_data: Optional[ExtraData] = None


@dataclass_json
@dataclass
class CustomResponse:
    data: Optional[any] = None
    payload: Optional[Payload] = None


@dataclass_json
@dataclass
class AuthResponse:
    api_token: str
    refreshToken: str = None
