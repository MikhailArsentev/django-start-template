from django.db import models
from datetime import date

from django.urls import reverse

class Page(models.Model):
    name = models.CharField('Название страницы', max_length=150)
    url = models.SlugField('Символьный код', max_length=160, unique=True)
    preview_text = models.TextField('Описание анонса', blank=True, null=True)
    detail_text = models.TextField('Детальное описание', blank=True, null=True)
    img_preview = models.ImageField('Картинка для анонса', upload_to='page/page_img_preview/', blank=True, null=True)
    img_detail = models.ImageField('Детальная картинка', upload_to='page/page_img_detail/', blank=True, null=True)
    img_og = models.ImageField('Картинка для Open graph', upload_to='page/page_img_og/', blank=True, null=True)
    youtube_link = models.CharField('Ссылка на видео YouTube', max_length=160, blank=True, null=True)
    head_title = models.CharField('Заголовок окна браузера', max_length=150, blank=True, null=True)
    meta_description = models.TextField('meta Description', blank=True, null=True)
    title = models.CharField('Заголовок h1 страницы', max_length=150, blank=True, null=True)
    active = models.BooleanField('Активность', default=True)
    date_begin = models.DateField("Дата начала активности", default=date.today, blank=True, null=True)
    date_end = models.DateField("Дата окончания активности", blank=True, null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('page_url', kwargs={'slug': self.url})

    class Meta:
        verbose_name = "Страница"
        verbose_name_plural = "Страницы"


class PageImg(models.Model):
    name = models.CharField('Название картинки', max_length=150, blank=True, null=True)
    img = models.ImageField('Изображение', upload_to='page/page_img/')
    page = models.ForeignKey(Page, verbose_name='Страница', on_delete=models.CASCADE)

    def __str__(self):
        return self.img

    class Meta:
        verbose_name = "Картинка"
        verbose_name_plural = "Картинки"