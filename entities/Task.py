from .User import User;


class Task:
    """Класс задачи
    :param id: идентификатор
    :type id: int
    :param title: название
    :type title: string
    :param description: описание
    :type description: string
    :param user: пользователь
    :type user: User"""

    def __init__(self, id: int, title: str, description: str, user: User):
        self.id = id
        self.title = title
        self.description = description
        self.user = user
